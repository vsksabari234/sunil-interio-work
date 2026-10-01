import React, { useState } from 'react';
import { X, Upload, CheckCircle2, Image as ImageIcon, Trash2, Plus, Sparkles } from 'lucide-react';
import { savePhoto, getAllPhotos, deletePhoto, StoredPhoto } from '../services/photoStorage';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetCategory?: string;
  targetProjectId?: string;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  targetCategory = 'wardrobes',
  targetProjectId,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(targetCategory);
  const [isHero, setIsHero] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [existingPhotos, setExistingPhotos] = useState<StoredPhoto[]>([]);

  // Load existing photos when modal opens
  React.useEffect(() => {
    if (isOpen) {
      loadExisting();
      if (targetCategory) setCategory(targetCategory);
    }
  }, [isOpen, targetCategory]);

  const loadExisting = async () => {
    const list = await getAllPhotos();
    setExistingPhotos(list);
  };

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
      if (!title) {
        // Derive initial title from filename
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl) return;

    setIsSaving(true);
    const photoId = targetProjectId || `photo-${Date.now()}`;

    await savePhoto({
      id: photoId,
      title: title.trim() || 'Custom Woodwork Installation',
      category: category,
      dataUrl: previewUrl,
      uploadedAt: new Date().toISOString(),
      isHero: isHero,
    });

    setIsSaving(false);
    setSavedSuccess(true);
    await loadExisting();

    setTimeout(() => {
      setSavedSuccess(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setTitle('');
    }, 1500);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Remove this photo from the site?')) {
      await deletePhoto(id);
      await loadExisting();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-modal-title"
    >
      <div
        className="relative bg-white text-[#1C110B] rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#E8DECE]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#FAF7F2] border-b border-[#E8DECE] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A532B] mb-1">
              <Upload className="w-3.5 h-3.5" />
              <span>Sunil Woodworks Photo Manager</span>
            </div>
            <h3 id="upload-modal-title" className="font-serif-wood text-xl sm:text-2xl font-bold text-[#1C110B]">
              Add Real Project Photos
            </h3>
            <p className="text-xs text-[#554C43]">
              Upload authentic site photos from your phone, camera, or PDF to display on the website.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-[#6B6258] hover:text-[#1C110B] hover:bg-white border border-[#E8DECE] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {savedSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-serif-wood text-xl font-bold text-[#1C110B]">
                Photo Added Successfully!
              </h4>
              <p className="text-xs text-[#554C43]">
                Your photo is now live on the website across the gallery and project cards.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              {/* File Dropzone */}
              <div>
                <label className="block text-xs font-semibold text-[#1C110B] mb-1.5">
                  Select Project Photo (JPG, PNG, WEBP)
                </label>
                <div className="relative border-2 border-dashed border-[#D4A373] hover:border-[#8A532B] rounded-xl p-6 text-center bg-[#FAF7F2] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {previewUrl ? (
                    <div className="space-y-2">
                      <div className="max-h-56 mx-auto rounded-lg overflow-hidden border border-[#E8DECE] shadow-sm inline-block">
                        <img src={previewUrl} alt="Preview" className="max-h-56 object-contain" />
                      </div>
                      <p className="text-xs text-[#8A532B] font-semibold">
                        Click or drag to replace this photo
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 py-4">
                      <div className="w-12 h-12 rounded-full bg-white border border-[#E8DECE] flex items-center justify-center mx-auto text-[#8A532B]">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-semibold text-[#1C110B]">
                        Click to select photo or drag and drop
                      </p>
                      <p className="text-xs text-[#6B6258]">
                        Select from your phone gallery, computer, or exported PDF screenshots
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1C110B] mb-1">
                    Project Title / Description
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. 3-Door Sliding Wardrobe with Brass Inlays"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DECE] text-xs sm:text-sm text-[#1C110B] placeholder:text-[#9C8F80] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C110B] mb-1">
                    Project Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DECE] text-xs sm:text-sm text-[#1C110B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B]"
                  >
                    <option value="wardrobes">Wardrobes & Storage</option>
                    <option value="kitchens">Modular Kitchens</option>
                    <option value="doors">Doors & Wooden Frames</option>
                    <option value="tv-units">TV Entertainment Units</option>
                    <option value="furniture">Custom Furniture (Tables, Sofas, Desks)</option>
                    <option value="bedrooms">Bedrooms & Hydraulic Beds</option>
                    <option value="other">Pooja Mandirs & Special Woodwork</option>
                  </select>
                </div>
              </div>

              {/* Feature on Hero Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isHero"
                  checked={isHero}
                  onChange={(e) => setIsHero(e.target.checked)}
                  className="rounded text-[#8A532B] focus:ring-[#8A532B]"
                />
                <label htmlFor="isHero" className="text-xs text-[#554C43] cursor-pointer">
                  Feature this photo in the top Homepage Hero showcase
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!previewUrl || isSaving}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#8A532B] hover:bg-[#724422] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                <span>{isSaving ? 'Saving Photo...' : 'Save & Publish to Website'}</span>
              </button>
            </form>
          )}

          {/* Currently Uploaded Photos Grid */}
          <div className="pt-4 border-t border-[#E8DECE]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A532B]">
                Your Live Photos ({existingPhotos.length})
              </span>
              <span className="text-[11px] text-[#6B6258]">
                Stored securely in your browser
              </span>
            </div>

            {existingPhotos.length === 0 ? (
              <p className="text-xs text-[#6B6258] italic py-2">
                No custom photos added yet. Upload photos from your PDF above to see them here!
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-48 overflow-y-auto p-1">
                {existingPhotos.map((photo) => (
                  <div key={photo.id} className="relative rounded-lg overflow-hidden border border-[#E8DECE] group bg-[#FAF7F2]">
                    <div className="aspect-square overflow-hidden">
                      <img src={photo.dataUrl} alt={photo.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-1.5 text-[10px]">
                      <span className="font-semibold text-[#1C110B] truncate block">{photo.title}</span>
                      <span className="text-[#8A532B] uppercase">{photo.category}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(photo.id)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      title="Delete photo"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
