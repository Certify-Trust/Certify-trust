"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Group {
  id: string;
  displayName: string;
  category: string;
  certificateImage: string;
  badgeImage: string;
  credentialsCount: number;
  unpublishedCount: number;
  updatedAt: string;
}

interface GroupsContextType {
  groups: Group[];
  addGroup: (group: Omit<Group, "id" | "credentialsCount" | "unpublishedCount" | "updatedAt">) => void;
  updateGroup: (id: string, group: Partial<Group>) => void;
  deleteGroup: (id: string) => void;
}

const GroupsContext = createContext<GroupsContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const GroupsProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<Group[]>([]);

  const addGroup = (group: Omit<Group, "id" | "credentialsCount" | "unpublishedCount" | "updatedAt">) => {
    const newGroup: Group = {
      ...group,
      id: Date.now().toString(),
      credentialsCount: 0,
      unpublishedCount: 0,
      updatedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    setGroups((prev) => [newGroup, ...prev]);
  };

  const updateGroup = (id: string, group: Partial<Group>) => {
    setGroups((prev) => prev.map((g) => (g.id === id ? { ...g, ...group } : g)));
  };

  const deleteGroup = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <GroupsContext.Provider value={{ groups, addGroup, updateGroup, deleteGroup }}>
      {children}
    </GroupsContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useGroups = () => {
  const context = useContext(GroupsContext);
  if (!context) throw new Error("useGroups must be used within a GroupsProvider");
  return context;
};