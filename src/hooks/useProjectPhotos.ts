import { useState, useEffect, useCallback } from 'react';
import { getAllPhotos, StoredPhoto } from '../services/photoStorage';
import { getAuthenticPhotoFor, authenticPhotos } from '../data/authenticPhotos';

export const useProjectPhotos = () => {
  const [photos, setPhotos] = useState<StoredPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshPhotos = useCallback(async () => {
    try {
      const list = await getAllPhotos();
      setPhotos(list);
    } catch (e) {
      console.warn('Error loading photos:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshPhotos();

    const handleUpdate = () => {
      refreshPhotos();
    };

    window.addEventListener('sunil_photos_updated', handleUpdate);
    return () => {
      window.removeEventListener('sunil_photos_updated', handleUpdate);
    };
  }, [refreshPhotos]);

  // Lookup by user uploaded first, then fallback to authentic portfolio photos from the documentation
  const getPhotoFor = useCallback(
    (id?: string, category?: string): string | null => {
      if (photos.length) {
        if (id) {
          const direct = photos.find((p) => p.id === id);
          if (direct) return direct.dataUrl;
        }

        if (category) {
          const catMatch = photos.find((p) => p.category === category);
          if (catMatch) return catMatch.dataUrl;
        }
      }

      // Check authentic portfolio catalog photos
      return getAuthenticPhotoFor(id, category);
    },
    [photos]
  );

  const getHeroPhotos = useCallback((): StoredPhoto[] => {
    return photos.filter((p) => p.isHero);
  }, [photos]);

  return {
    photos,
    loading,
    refreshPhotos,
    getPhotoFor,
    getHeroPhotos,
    authenticPhotos,
  };
};
