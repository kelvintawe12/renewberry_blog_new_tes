import { create } from 'zustand';

interface DocumentState {
  id: string | null;
  title: string;
  content: string;
  lastSaved: Date | null;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setDocument: (id: string, title: string, content: string) => void;
}

export const useDocumentStore = create<DocumentState>((set) => ({
  id: null,
  title: 'Untitled Document',
  content: '',
  lastSaved: null,
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content, lastSaved: new Date() }),
  setDocument: (id, title, content) => set({ id, title, content, lastSaved: new Date() }),
}));
