import { useState, useEffect } from "react";
import { works as defaultWorks, type Work } from "./works";
import { ABSTRACT_ARTS as defaultAbstracts, type AbstractArtProject } from "./abstract-data";
import { STUDIO as defaultStudio } from "./studio";
import { db } from "./firebase";
import { collection, onSnapshot, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";

export interface MediaItem {
  id: string;
  url: string;
  filename: string;
  addedAt: string;
}

const defaultMedia: MediaItem[] = defaultWorks.map((w, index) => ({
  id: `m-init-${index}`,
  url: w.url,
  filename: `${w.title.toLowerCase().replace(/[^a-z0-9]+/g, "_")}.jpg`,
  addedAt: new Date().toISOString(),
}));

// Observers for state changes
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const notify = () => {
  listeners.forEach((l) => l());
};

// Memory-backed caches
let worksCache: Work[] = [...defaultWorks];
let abstractsCache: AbstractArtProject[] = [...defaultAbstracts];
let studioCache = { ...defaultStudio };
let mediaCache: MediaItem[] = [...defaultMedia];

// Firestore Error Handling
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: [],
    },
    operationType,
    path,
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Check and initialize Firestore if empty
let isInitializing = false;

async function initFirestoreIfNeeded() {
  if (isInitializing) return;
  isInitializing = true;
  try {
    // 1. Works
    const worksRef = collection(db, "works");
    const worksSnap = await getDocs(worksRef);
    if (worksSnap.empty) {
      console.log("Initializing Firestore works with defaults...");
      for (const w of defaultWorks) {
        await setDoc(doc(db, "works", w.id), w);
      }
    }

    // 2. Abstracts
    const abstractsRef = collection(db, "abstracts");
    const abstractsSnap = await getDocs(abstractsRef);
    if (abstractsSnap.empty) {
      console.log("Initializing Firestore abstracts with defaults...");
      for (const abs of defaultAbstracts) {
        await setDoc(doc(db, "abstracts", abs.id), abs);
      }
    }

    // 3. Studio info
    const studioDocRef = doc(db, "studio", "info");
    const studioSnap = await getDocs(collection(db, "studio"));
    if (studioSnap.empty) {
      console.log("Initializing Firestore studio with defaults...");
      await setDoc(studioDocRef, defaultStudio);
    }

    // 4. Media
    const mediaRef = collection(db, "media");
    const mediaSnap = await getDocs(mediaRef);
    if (mediaSnap.empty) {
      console.log("Initializing Firestore media with defaults...");
      for (const m of defaultMedia) {
        await setDoc(doc(db, "media", m.id), m);
      }
    }
  } catch (err) {
    console.error("Failed to initialize Firestore collections:", err);
  }
}

// Subscribe to real-time updates from Firestore
if (typeof window !== "undefined") {
  initFirestoreIfNeeded().then(() => {
    // Works subscription
    onSnapshot(
      collection(db, "works"),
      (snapshot) => {
        const list: Work[] = [];
        snapshot.forEach((docSnap) => {
          list.push(docSnap.data() as Work);
        });
        list.sort((a, b) => b.id.localeCompare(a.id));
        worksCache = list;
        notify();
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, "works");
      },
    );

    // Abstracts subscription
    onSnapshot(
      collection(db, "abstracts"),
      (snapshot) => {
        const list: AbstractArtProject[] = [];
        snapshot.forEach((docSnap) => {
          list.push(docSnap.data() as AbstractArtProject);
        });
        list.sort((a, b) => b.id.localeCompare(a.id));
        abstractsCache = list;
        notify();
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, "abstracts");
      },
    );

    // Studio settings subscription
    onSnapshot(
      doc(db, "studio", "info"),
      (docSnap) => {
        if (docSnap.exists()) {
          studioCache = docSnap.data() as typeof defaultStudio;
          notify();
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, "studio/info");
      },
    );

    // Media library subscription
    onSnapshot(
      collection(db, "media"),
      (snapshot) => {
        const list: MediaItem[] = [];
        snapshot.forEach((docSnap) => {
          list.push(docSnap.data() as MediaItem);
        });
        list.sort((a, b) => b.id.localeCompare(a.id));
        mediaCache = list;
        notify();
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, "media");
      },
    );
  });
}

// React hooks to consume state reactively
export function useWorks(): Work[] {
  const [state, setState] = useState(worksCache);
  useEffect(() => {
    return subscribe(() => setState([...worksCache]));
  }, []);
  return state;
}

export function useAbstracts(): AbstractArtProject[] {
  const [state, setState] = useState(abstractsCache);
  useEffect(() => {
    return subscribe(() => setState([...abstractsCache]));
  }, []);
  return state;
}

export function useStudio(): typeof defaultStudio {
  const [state, setState] = useState(studioCache);
  useEffect(() => {
    return subscribe(() => setState({ ...studioCache }));
  }, []);
  return state;
}

export function useMediaLibrary(): MediaItem[] {
  const [state, setState] = useState(mediaCache);
  useEffect(() => {
    return subscribe(() => setState([...mediaCache]));
  }, []);
  return state;
}

// Utility to export current dynamic data
export function getExportData() {
  return {
    works: worksCache,
    abstracts: abstractsCache,
    studio: studioCache,
    media: mediaCache,
  };
}

// Store actions
export const storeActions = {
  // Works Gallery actions
  addWork: async (work: Omit<Work, "id">) => {
    const id = "w-" + Date.now();
    const newWork: Work = { ...work, id };
    try {
      await setDoc(doc(db, "works", id), newWork);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `works/${id}`);
    }
    return newWork;
  },

  updateWork: async (id: string, updated: Partial<Work>) => {
    const current = worksCache.find((w) => w.id === id) || {};
    try {
      await setDoc(doc(db, "works", id), { ...current, ...updated }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `works/${id}`);
    }
  },

  deleteWork: async (id: string) => {
    try {
      await deleteDoc(doc(db, "works", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `works/${id}`);
    }
  },

  // Abstract Projects actions
  addAbstract: async (project: Omit<AbstractArtProject, "id">) => {
    const id = "abs-" + Date.now();
    const newProj: AbstractArtProject = { ...project, id };
    try {
      await setDoc(doc(db, "abstracts", id), newProj);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `abstracts/${id}`);
    }
    return newProj;
  },

  updateAbstract: async (id: string, updated: Partial<AbstractArtProject>) => {
    const current = abstractsCache.find((p) => p.id === id) || {};
    try {
      await setDoc(doc(db, "abstracts", id), { ...current, ...updated }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `abstracts/${id}`);
    }
  },

  deleteAbstract: async (id: string) => {
    try {
      await deleteDoc(doc(db, "abstracts", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `abstracts/${id}`);
    }
  },

  // Media Library actions
  addMedia: async (url: string, filename: string) => {
    const id = "m-" + Date.now();
    const newItem: MediaItem = {
      id,
      url,
      filename,
      addedAt: new Date().toISOString(),
    };
    try {
      await setDoc(doc(db, "media", id), newItem);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `media/${id}`);
    }
    return newItem;
  },

  deleteMedia: async (id: string) => {
    try {
      await deleteDoc(doc(db, "media", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `media/${id}`);
    }
  },

  // General settings actions
  updateStudio: async (updated: Partial<typeof defaultStudio>) => {
    try {
      await setDoc(doc(db, "studio", "info"), updated, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, "studio/info");
    }
  },

  // Import / Reset settings
  importAll: async (data: {
    works?: Work[];
    abstracts?: AbstractArtProject[];
    studio?: typeof defaultStudio;
    media?: MediaItem[];
  }) => {
    try {
      if (data.works && Array.isArray(data.works)) {
        for (const w of data.works) {
          await setDoc(doc(db, "works", w.id), w);
        }
      }
      if (data.abstracts && Array.isArray(data.abstracts)) {
        for (const abs of data.abstracts) {
          await setDoc(doc(db, "abstracts", abs.id), abs);
        }
      }
      if (data.studio && typeof data.studio === "object") {
        await setDoc(doc(db, "studio", "info"), data.studio, { merge: true });
      }
      if (data.media && Array.isArray(data.media)) {
        for (const m of data.media) {
          await setDoc(doc(db, "media", m.id), m);
        }
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, "importAll");
    }
  },

  resetToDefaults: async () => {
    try {
      // Delete existing
      const worksSnap = await getDocs(collection(db, "works"));
      for (const d of worksSnap.docs) {
        await deleteDoc(doc(db, "works", d.id));
      }
      const abstractsSnap = await getDocs(collection(db, "abstracts"));
      for (const d of abstractsSnap.docs) {
        await deleteDoc(doc(db, "abstracts", d.id));
      }
      const mediaSnap = await getDocs(collection(db, "media"));
      for (const d of mediaSnap.docs) {
        await deleteDoc(doc(db, "media", d.id));
      }

      // Restore defaults
      await setDoc(doc(db, "studio", "info"), defaultStudio);
      for (const w of defaultWorks) {
        await setDoc(doc(db, "works", w.id), w);
      }
      for (const abs of defaultAbstracts) {
        await setDoc(doc(db, "abstracts", abs.id), abs);
      }
      for (const m of defaultMedia) {
        await setDoc(doc(db, "media", m.id), m);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, "resetToDefaults");
    }
  },
};
