// Persistent in-browser storage for Sunil Woodworks' real project photos
// Uses IndexedDB to support storing high-resolution site photos without size limits

const DB_NAME = 'sunil_woodworks_photos_db';
const DB_VERSION = 1;
const STORE_NAME = 'project_photos';

export interface StoredPhoto {
  id: string; // e.g. 'proj-01', 'hero-tv', or timestamp-based ID
  title: string;
  category: string; // 'furniture' | 'wardrobes' | 'kitchens' | 'doors' | 'tv-units' | 'other'
  dataUrl: string; // Base64 data URL
  uploadedAt: string;
  isHero?: boolean;
}

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const savePhoto = async (photo: StoredPhoto): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(photo);
      req.onsuccess = () => {
        window.dispatchEvent(new CustomEvent('sunil_photos_updated', { detail: { id: photo.id } }));
        resolve();
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to save photo in IndexedDB:', err);
  }
};

export const getAllPhotos = async (): Promise<StoredPhoto[]> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not read photos from IndexedDB:', err);
    return [];
  }
};

export const getPhotoById = async (id: string): Promise<StoredPhoto | null> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    return null;
  }
};

export const deletePhoto = async (id: string): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => {
        window.dispatchEvent(new CustomEvent('sunil_photos_updated', { detail: { id } }));
        resolve();
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to delete photo from IndexedDB:', err);
  }
};
