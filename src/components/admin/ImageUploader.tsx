'use client';

import { useState, useRef } from 'react';
import { UploadSimple, Image as ImageIcon, X, LinkSimple, Plus } from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  multiple?: boolean;
}

export function ImageUploader({
  images,
  onChange,
  multiple = true,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newUrl, setNewUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    processFiles(Array.from(files));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const processFiles = async (files: File[]) => {
    setUploading(true);
    const newImages: string[] = [];

    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;

      // Read file as Base64 data URL for immediate preview and offline portability
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      newImages.push(dataUrl);
    }

    if (newImages.length > 0) {
      if (multiple) {
        onChange([...images, ...newImages]);
      } else {
        onChange([newImages[0]]);
      }
    }
    setUploading(false);
  };

  const handleAddUrl = () => {
    if (newUrl.trim()) {
      if (multiple) {
        onChange([...images, newUrl.trim()]);
      } else {
        onChange([newUrl.trim()]);
      }
      setNewUrl('');
      setShowUrlInput(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div className="image-uploader">
      {/* Hidden File Input for Native File Browser / Phone Gallery */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/svg+xml"
        multiple={multiple}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Image Thumbnails Grid */}
      {images.length > 0 && (
        <div className="image-uploader__grid">
          {images.map((img, idx) => (
            <div key={idx} className="image-uploader__thumb-card">
              <img src={img} alt={`Uploaded ${idx + 1}`} className="image-uploader__img" />
              <button
                type="button"
                className="image-uploader__remove-btn"
                onClick={() => handleRemoveImage(idx)}
                title="Remove Image"
              >
                <X size={14} weight="bold" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Drop Zone & Action Bar */}
      <div
        className={`image-uploader__dropzone ${isDragging ? 'image-uploader__dropzone--active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="image-uploader__dropzone-icon">
          <UploadSimple size={24} weight="bold" />
        </div>
        <div className="image-uploader__dropzone-text">
          <strong>{uploading ? 'Processing Image...' : 'Click to Browse Device / Mobile Gallery'}</strong>
          <span>Supports PNG, JPG, WebP, GIF or SVG — Or drag & drop here</span>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
        >
          <ImageIcon size={16} weight="bold" />
          <span>Browse Files</span>
        </Button>
      </div>

      {/* Manual URL Input Toggle */}
      <div className="image-uploader__url-bar">
        {!showUrlInput ? (
          <button
            type="button"
            className="image-uploader__url-toggle"
            onClick={() => setShowUrlInput(true)}
          >
            <LinkSimple size={14} weight="bold" />
            <span>Or enter external Image URL</span>
          </button>
        ) : (
          <div className="image-uploader__url-input-row">
            <input
              type="text"
              className="checkout__input"
              placeholder="Paste Image URL (e.g. https://... or /images/products/...)"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
            <Button type="button" variant="secondary" size="sm" onClick={handleAddUrl}>
              <Plus size={14} weight="bold" />
              <span>Add URL</span>
            </Button>
            <button
              type="button"
              className="image-uploader__cancel-url"
              onClick={() => setShowUrlInput(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .image-uploader {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .image-uploader__grid {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .image-uploader__thumb-card {
          position: relative;
          width: 90px;
          height: 90px;
          border-radius: 8px;
          overflow: hidden;
          background: var(--graphite-light);
          border: 1px solid var(--border-subtle);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .image-uploader__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-uploader__remove-btn {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(239, 68, 68, 0.85);
          color: var(--white);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform var(--duration-fast);
        }
        .image-uploader__remove-btn:hover {
          transform: scale(1.1);
          background: var(--error);
        }

        .image-uploader__dropzone {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 2px dashed var(--graphite-border);
          border-radius: 10px;
          cursor: pointer;
          transition: all var(--duration-fast);
          gap: 16px;
        }

        .image-uploader__dropzone:hover,
        .image-uploader__dropzone--active {
          border-color: var(--accent);
          background: rgba(59, 130, 246, 0.06);
        }

        .image-uploader__dropzone-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.12);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .image-uploader__dropzone-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .image-uploader__dropzone-text strong {
          font-family: var(--font-display);
          font-size: 0.875rem;
          color: var(--white);
        }

        .image-uploader__dropzone-text span {
          font-size: 0.75rem;
          color: var(--muted-light);
        }

        .image-uploader__url-bar {
          display: flex;
          flex-direction: column;
        }

        .image-uploader__url-toggle {
          background: none;
          border: none;
          color: var(--accent);
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          width: fit-content;
        }

        .image-uploader__url-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .image-uploader__cancel-url {
          background: none;
          border: none;
          color: var(--muted);
          font-size: 0.75rem;
          cursor: pointer;
          white-space: nowrap;
        }

        @media (max-width: 640px) {
          .image-uploader__dropzone {
            flex-direction: column;
            text-align: center;
            padding: 16px;
          }
          .image-uploader__dropzone-text {
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}
