import type React from 'react';

import { useState, useRef } from 'react';
import { ImagePlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useProfileStore } from '@/store/useProfileStore';
import { log } from '@/lib/analytics';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function BackgroundImageUploader() {
  const backgroundImage = useProfileStore((s) => s.backgroundImage);
  const setBackgroundImage = useProfileStore((s) => s.setBackgroundImage);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setError(null);
    if (file.size > MAX_FILE_SIZE) {
      setError('Image must be under 5MB');
      log('background_image_error', { reason: 'size_exceeded' });
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setBackgroundImage(event.target?.result as string);
      log('background_image_upload');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleRemoveImage = () => {
    setBackgroundImage(null);
    setError(null);
    log('background_image_remove');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="background-image">Image</Label>

      <div
        className={`relative rounded-lg border-2 border-dashed transition-colors cursor-pointer ${
          isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-muted-foreground/40'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !backgroundImage && fileInputRef.current?.click()}
      >
        {backgroundImage ? (
          <div className="relative group">
            <img
              src={backgroundImage}
              alt="Background preview"
              className="w-full h-36 object-cover rounded-[calc(var(--radius)-2px)]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors rounded-[calc(var(--radius)-2px)] flex items-center justify-center">
              <Button
                variant="destructive"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                }}
              >
                <X className="size-3.5 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <ImagePlus className="size-8 mb-2 opacity-50" />
            <p className="text-sm">Drop image here or click to browse</p>
            <p className="text-xs opacity-60 mt-1">Max 5MB</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          id="background-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
