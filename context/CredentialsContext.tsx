"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Credential {
  id: string;
  recipientName: string;
  recipientEmail: string;
  group: string;
  groupId: string;
  credentialId: string;
  issueDate: string;
  expiryDate: string;
  published: boolean;
}

interface CredentialsContextType {
  credentials: Credential[];
  addCredentials: (credentials: Omit<Credential, "id" | "credentialId" | "published">[]) => void;
  publishCredential: (id: string) => void;
  publishCredentials: (ids: string[]) => void;
  deleteCredentials: (ids: string[]) => void;
}

const CredentialsContext = createContext<CredentialsContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const CredentialsProvider = ({ children }: { children: ReactNode }) => {
  const [credentials, setCredentials] = useState<Credential[]>([]);

  const addCredentials = (newCreds: Omit<Credential, "id" | "credentialId" | "published">[]) => {
    const created = newCreds.map((c) => ({
      ...c,
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      credentialId: Math.floor(10000000 + Math.random() * 90000000).toString(),
      published: false,
    }));
    setCredentials((prev) => [...prev, ...created]);
  };

  const publishCredential = (id: string) => {
    setCredentials((prev) =>
      prev.map((c) => (c.id === id ? { ...c, published: true } : c))
    );
  };

  const publishCredentials = (ids: string[]) => {
    setCredentials((prev) =>
      prev.map((c) => (ids.includes(c.id) ? { ...c, published: true } : c))
    );
  };

  const deleteCredentials = (ids: string[]) => {
    setCredentials((prev) => prev.filter((c) => !ids.includes(c.id)));
  };

  return (
    <CredentialsContext.Provider value={{ credentials, addCredentials, publishCredential, publishCredentials, deleteCredentials }}>
      {children}
    </CredentialsContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useCredentials = () => {
  const context = useContext(CredentialsContext);
  if (!context) throw new Error("useCredentials must be used within a CredentialsProvider");
  return context;
};