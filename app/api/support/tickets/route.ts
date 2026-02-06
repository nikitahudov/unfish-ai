import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendTicketConfirmation, sendNewTicketAdmin } from '@/lib/email/send';
import type { Json } from '@/types/database';
import { TicketCategory, Attachment } from '@/types/support';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const adminDb = createAdminClient();

    // Get current user (if logged in)
    const { data: { user } } = await supabase.auth.getUser();

    // Parse form data
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const category = formData.get('category') as TicketCategory;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const userAgent = formData.get('userAgent') as string;
    const pageUrl = formData.get('pageUrl') as string;

    // Validate required fields
    if (!name || !email || !category || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Upload attachments using admin client (bypasses storage RLS)
    const attachments: Attachment[] = [];
    const fileKeys = Array.from(formData.keys()).filter(key => key.startsWith('file-'));

    for (const key of fileKeys) {
      const file = formData.get(key) as File;
      if (file && file.size > 0) {
        const fileExt = file.name.split('.').pop();
        const fileName = `pending/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await adminDb.storage
          .from('support-attachments')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          console.error('Error uploading attachment:', uploadError);
          continue;
        }

        const { data: urlData } = await adminDb.storage
          .from('support-attachments')
          .createSignedUrl(uploadData.path, 60 * 60 * 24 * 30);

        attachments.push({
          name: file.name,
          url: urlData?.signedUrl || '',
          size: file.size,
          type: file.type,
        });
      }
    }

    // Create ticket using admin client (bypasses RLS)
    const { data: ticket, error: ticketError } = await adminDb
      .from('support_tickets')
      .insert({
        user_id: user?.id || null,
        name,
        email,
        is_authenticated: !!user,
        category,
        subject,
        message,
        attachments: attachments as unknown as Json,
        user_agent: userAgent || null,
        page_url: pageUrl || null,
        status: 'open',
        priority: 'normal',
      })
      .select('id, ticket_number')
      .single();

    if (ticketError) {
      console.error('Error creating ticket:', ticketError);
      return NextResponse.json(
        { error: 'Failed to create ticket' },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    await sendTicketConfirmation({
      to: email,
      name,
      ticketId: ticket.id,
      ticketNumber: ticket.ticket_number,
      subject,
      category,
      message,
    });

    // Send notification to admin
    await sendNewTicketAdmin({
      ticketId: ticket.id,
      ticketNumber: ticket.ticket_number,
      name,
      email,
      isAuthenticated: !!user,
      category,
      subject,
      message,
      priority: 'normal',
      attachmentCount: attachments.length,
      userAgent,
    });

    return NextResponse.json({
      success: true,
      ticketId: ticket.id,
      ticketNumber: ticket.ticket_number,
    });
  } catch (error) {
    console.error('Error in ticket submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
