'use client';

import React, { useCallback, useState } from 'react';

interface UploadedFile {
  file: File;
  preview?: string;
  uploading?: boolean;
  error?: string;
}

interface FileUploadProps {
  files: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedTypes?: string[];
  disabled?: boolean;
}

const DEFAULT_ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
];

export function FileUpload({
  files,
  onChange,
  maxFiles = 3,
  maxSizeMB = 5,
  acceptedTypes = DEFAULT_ACCEPTED_TYPES,
  disabled = false,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const validateFile = useCallback((file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `File type not allowed. Accepted: ${acceptedTypes.map(t => t.split('/')[1]).join(', ')}`;
    }
    if (file.size > maxSizeBytes) {
      return `File too large. Maximum size: ${maxSizeMB}MB`;
    }
    return null;
  }, [acceptedTypes, maxSizeBytes, maxSizeMB]);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const remainingSlots = maxFiles - files.length;

    if (remainingSlots <= 0) {
      return;
    }

    const filesToAdd = fileArray.slice(0, remainingSlots).map(file => {
      const error = validateFile(file);
      const preview = file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : undefined;

      return {
        file,
        preview,
        error: error || undefined,
      };
    });

    onChange([...files, ...filesToAdd]);
  }, [files, maxFiles, onChange, validateFile]);

  const removeFile = useCallback((index: number) => {
    const newFiles = [...files];
    const removed = newFiles.splice(index, 1)[0];

    // Revoke object URL to prevent memory leaks
    if (removed.preview) {
      URL.revokeObjectURL(removed.preview);
    }

    onChange(newFiles);
  }, [files, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    if (e.dataTransfer.files) {
      addFiles(e.dataTransfer.files);
    }
  }, [addFiles, disabled]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(e.target.files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  }, [addFiles]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (type: string): string => {
    if (type.startsWith('image/')) return '🖼️';
    if (type === 'application/pdf') return '📄';
    return '📎';
  };

  return (
    <div className="space-y-3">
      {/* Drop Zone */}
      {files.length < maxFiles && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            disabled
              ? 'border-slate-700 bg-slate-800/50 cursor-not-allowed'
              : isDragging
              ? 'border-amber-500 bg-amber-500/10'
              : 'border-slate-600 hover:border-slate-500 bg-slate-800/50'
          }`}
        >
          <input
            type="file"
            multiple
            accept={acceptedTypes.join(',')}
            onChange={handleFileInput}
            disabled={disabled}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />

          <div className="space-y-2">
            <div className="text-3xl">📎</div>
            <p className="text-sm text-slate-300">
              {isDragging ? (
                'Drop files here...'
              ) : (
                <>
                  <span className="text-amber-400 font-medium">Click to upload</span>
                  {' '}or drag and drop
                </>
              )}
            </p>
            <p className="text-xs text-slate-500">
              PNG, JPG, GIF, WebP, or PDF (max {maxSizeMB}MB each, up to {maxFiles} files)
            </p>
          </div>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((uploadedFile, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                uploadedFile.error
                  ? 'bg-red-500/10 border-red-500/30'
                  : 'bg-slate-700/50 border-slate-600'
              }`}
            >
              {/* Preview or Icon */}
              {uploadedFile.preview ? (
                <img
                  src={uploadedFile.preview}
                  alt={uploadedFile.file.name}
                  className="w-10 h-10 object-cover rounded"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center bg-slate-600 rounded text-xl">
                  {getFileIcon(uploadedFile.file.type)}
                </div>
              )}

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">
                  {uploadedFile.file.name}
                </p>
                {uploadedFile.error ? (
                  <p className="text-xs text-red-400">{uploadedFile.error}</p>
                ) : (
                  <p className="text-xs text-slate-500">
                    {formatFileSize(uploadedFile.file.size)}
                  </p>
                )}
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeFile(index)}
                disabled={disabled}
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
                aria-label="Remove file"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* File Count */}
      {files.length > 0 && (
        <p className="text-xs text-slate-500 text-right">
          {files.length} of {maxFiles} files
        </p>
      )}
    </div>
  );
}
