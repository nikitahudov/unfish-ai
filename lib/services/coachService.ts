import { createClient } from '@/lib/supabase/client';
import type { CoachConversation } from '@/types/database';
import type { Message, CoachMode } from '@/types/coach';

export interface ConversationCreate {
  title?: string;
  mode?: CoachMode;
}

export interface ConversationUpdate {
  title?: string;
  is_archived?: boolean;
  is_starred?: boolean;
}

export const coachService = {
  /**
   * Get all conversations for the current user
   */
  async getAll(includeArchived: boolean = false): Promise<CoachConversation[]> {
    const supabase = createClient();

    let query = supabase
      .from('coach_conversations')
      .select('*')
      .order('last_message_at', { ascending: false });

    if (!includeArchived) {
      query = query.eq('is_archived', false);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }

    return data || [];
  },

  /**
   * Get a single conversation by ID
   */
  async getById(conversationId: string): Promise<CoachConversation | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('coach_conversations')
      .select('*')
      .eq('id', conversationId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching conversation:', error);
      throw error;
    }

    return data;
  },

  /**
   * Create a new conversation
   */
  async create(options: ConversationCreate = {}): Promise<CoachConversation> {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('coach_conversations')
      .insert({
        user_id: user.id,
        title: options.title || null,
        mode: options.mode || 'chat',
        messages: [],
        message_count: 0,
        started_at: now,
        last_message_at: now,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }

    // Update stats
    await this.incrementConversationCount();

    return data;
  },

  /**
   * Add a message to a conversation
   */
  async addMessage(
    conversationId: string,
    message: Omit<Message, 'id' | 'timestamp'>
  ): Promise<CoachConversation> {
    const supabase = createClient();

    // Get current conversation
    const conversation = await this.getById(conversationId);
    if (!conversation) throw new Error('Conversation not found');

    const newMessage: Message = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...(conversation.messages as unknown as Message[]), newMessage];
    const now = new Date().toISOString();

    // Generate title from first user message if not set
    let title = conversation.title;
    if (!title && message.role === 'user' && updatedMessages.length <= 2) {
      title = this.generateTitle(message.content);
    }

    const { data, error } = await supabase
      .from('coach_conversations')
      .update({
        messages: updatedMessages as unknown as CoachConversation['messages'],
        message_count: updatedMessages.length,
        last_message_at: now,
        title,
        mode: message.mode || conversation.mode,
      })
      .eq('id', conversationId)
      .select()
      .single();

    if (error) {
      console.error('Error adding message:', error);
      throw error;
    }

    // Update message count in stats if it's a user message
    if (message.role === 'user') {
      await this.incrementMessageCount();
    }

    return data;
  },

  /**
   * Update conversation metadata
   */
  async update(conversationId: string, updates: ConversationUpdate): Promise<CoachConversation> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('coach_conversations')
      .update(updates)
      .eq('id', conversationId)
      .select()
      .single();

    if (error) {
      console.error('Error updating conversation:', error);
      throw error;
    }

    return data;
  },

  /**
   * Delete a conversation
   */
  async delete(conversationId: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('coach_conversations')
      .delete()
      .eq('id', conversationId);

    if (error) {
      console.error('Error deleting conversation:', error);
      throw error;
    }
  },

  /**
   * Archive a conversation
   */
  async archive(conversationId: string): Promise<CoachConversation> {
    return this.update(conversationId, { is_archived: true });
  },

  /**
   * Unarchive a conversation
   */
  async unarchive(conversationId: string): Promise<CoachConversation> {
    return this.update(conversationId, { is_archived: false });
  },

  /**
   * Toggle star on a conversation
   */
  async toggleStar(conversationId: string): Promise<CoachConversation> {
    const conversation = await this.getById(conversationId);
    if (!conversation) throw new Error('Conversation not found');

    return this.update(conversationId, { is_starred: !conversation.is_starred });
  },

  /**
   * Get recent conversations (for sidebar)
   */
  async getRecent(limit: number = 10): Promise<CoachConversation[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('coach_conversations')
      .select('id, title, mode, message_count, last_message_at, is_starred')
      .eq('is_archived', false)
      .order('last_message_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent conversations:', error);
      throw error;
    }

    return (data || []) as CoachConversation[];
  },

  /**
   * Search conversations by content
   */
  async search(query: string): Promise<CoachConversation[]> {
    const supabase = createClient();

    // Search in title
    // Note: This is a basic search. For better performance with large datasets,
    // consider using Postgres full-text search or a separate search index
    const { data, error } = await supabase
      .from('coach_conversations')
      .select('*')
      .or(`title.ilike.%${query}%`)
      .order('last_message_at', { ascending: false });

    if (error) {
      console.error('Error searching conversations:', error);
      throw error;
    }

    return data || [];
  },

  // Helper functions

  /**
   * Generate a title from message content
   */
  generateTitle(content: string): string {
    // Take first 50 characters, cut at word boundary
    const maxLength = 50;
    if (content.length <= maxLength) return content;

    const truncated = content.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    return lastSpace > 20
      ? truncated.substring(0, lastSpace) + '...'
      : truncated + '...';
  },

  /**
   * Increment conversation count in stats
   */
  async incrementConversationCount(): Promise<void> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: stats } = await supabase
      .from('user_stats')
      .select('coach_conversations_count')
      .eq('user_id', user.id)
      .single();

    if (stats) {
      await supabase
        .from('user_stats')
        .update({
          coach_conversations_count: stats.coach_conversations_count + 1,
        })
        .eq('user_id', user.id);
    }
  },

  /**
   * Increment message count in stats
   */
  async incrementMessageCount(): Promise<void> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: stats } = await supabase
      .from('user_stats')
      .select('coach_messages_sent')
      .eq('user_id', user.id)
      .single();

    if (stats) {
      await supabase
        .from('user_stats')
        .update({
          coach_messages_sent: stats.coach_messages_sent + 1,
        })
        .eq('user_id', user.id);
    }
  },
};
