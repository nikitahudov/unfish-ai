'use client';

import React, { useState, useRef } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { avatarService } from '@/lib/services';

interface AvatarUploadProps {
  onSuccess?: (url: string) => void;
}

export function AvatarUpload({ onSuccess }: AvatarUploadProps) {
  const { user, refreshProfile } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentAvatar = user?.profile?.avatar_url;
  const displayName = user?.profile?.display_name || user?.email?.split('@')[0] || 'User';
  const initials = displayName.slice(0, 2).toUpperCase();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Show preview
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    setIsUploading(true);
    try {
      const result = await avatarService.upload(file);

      if (result.success && result.url) {
        await refreshProfile();
        onSuccess?.(result.url);
        setPreview(null);
      } else {
        setError(result.error || 'Failed to upload');
        setPreview(null);
      }
    } catch {
      setError('An unexpected error occurred');
      setPreview(null);
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async () => {
    if (!confirm('Remove your profile picture?')) return;

    setError(null);
    setIsDeleting(true);

    try {
      const result = await avatarService.delete();

      if (result.success) {
        await refreshProfile();
      } else {
        setError(result.error || 'Failed to delete');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsDeleting(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-6">
      {/* Avatar Display */}
      <div className="relative group">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center">
          {isUploading && preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover opacity-50"
            />
          ) : currentAvatar ? (
            <img
              src={currentAvatar}
              alt={displayName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-amber-400">{initials}</span>
          )}

          {/* Upload overlay */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
              <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Hover overlay for upload */}
        {!isUploading && (
          <button
            onClick={triggerFileSelect}
            className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <span className="text-white text-sm font-medium">Change</span>
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="flex-1">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-wrap gap-3">
          <button
            onClick={triggerFileSelect}
            disabled={isUploading}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
          >
            {isUploading ? 'Uploading...' : 'Upload Photo'}
          </button>

          {currentAvatar && (
            <button
              onClick={handleDelete}
              disabled={isDeleting || isUploading}
              className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium rounded-lg transition-colors"
            >
              {isDeleting ? 'Removing...' : 'Remove'}
            </button>
          )}
        </div>

        <p className="text-xs text-slate-500 mt-2">
          JPG, PNG, GIF or WebP. Max 2MB.
        </p>

        {error && (
          <p className="text-xs text-red-400 mt-2">{error}</p>
        )}
      </div>
    </div>
  );
}
