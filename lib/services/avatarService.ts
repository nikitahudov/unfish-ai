import { createClient } from '@/lib/supabase/client';

const BUCKET_NAME = 'avatars';
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export const avatarService = {
  /**
   * Upload a new avatar
   */
  async upload(file: File): Promise<UploadResult> {
    const supabase = createClient();

    // Validate file
    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        success: false,
        error: 'Invalid file type. Please use JPEG, PNG, GIF, or WebP.',
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: 'File too large. Maximum size is 2MB.',
      };
    }

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return { success: false, error: 'Not authenticated' };
    }

    try {
      // Delete existing avatar first
      await this.delete();

      // Generate filename with user ID as folder
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `${user.id}/avatar-${Date.now()}.${fileExt}`;

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return { success: false, error: 'Failed to upload file' };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(fileName);

      const avatarUrl = urlData.publicUrl;

      // Update user profile with new avatar URL
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ avatar_url: avatarUrl })
        .eq('id', user.id);

      if (updateError) {
        console.error('Profile update error:', updateError);
        return { success: false, error: 'Failed to update profile' };
      }

      return { success: true, url: avatarUrl };
    } catch (error) {
      console.error('Avatar upload error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  /**
   * Delete current avatar
   */
  async delete(): Promise<{ success: boolean; error?: string }> {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    try {
      // List files in user's folder
      const { data: files, error: listError } = await supabase.storage
        .from(BUCKET_NAME)
        .list(user.id);

      if (listError) {
        console.error('List error:', listError);
        // Don't fail if folder doesn't exist
        return { success: true };
      }

      // Delete all files in user's folder
      if (files && files.length > 0) {
        const filePaths = files.map(f => `${user.id}/${f.name}`);

        const { error: deleteError } = await supabase.storage
          .from(BUCKET_NAME)
          .remove(filePaths);

        if (deleteError) {
          console.error('Delete error:', deleteError);
          return { success: false, error: 'Failed to delete avatar' };
        }
      }

      // Clear avatar URL in profile
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ avatar_url: null })
        .eq('id', user.id);

      if (updateError) {
        console.error('Profile update error:', updateError);
        return { success: false, error: 'Failed to update profile' };
      }

      return { success: true };
    } catch (error) {
      console.error('Avatar delete error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  /**
   * Get avatar URL for a user
   */
  getAvatarUrl(avatarUrl: string | null | undefined): string | null {
    return avatarUrl || null;
  },
};
