"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GroupFormData {
  // Info & Appearance
  displayName: string;
  identifier: string;
  courseWebsite: string;
  description: string;
  skills: string[];
  category: string;

  certificateImage: string;
badgeImage: string;

  // General Settings
  issuerName: string;
  website: string;
  defaultCategory: string;
  orgDescription: string;
  linkedInOrgId: string;
  linkedInUrl: string;
  twitterUsername: string;
  facebookUrl: string;
  instagramUsername: string;
  tikTokUsername: string;
  youTubeUsername: string;

  // Brand Settings
  orgLogo: string;
  contactEmail: string;
  bannerImage: string;
  credentialListOrder: string;
  customTweetMessage: string;
  seoTitle: string;
  seoDescription: string;

  // Blockchain Security
  recordToBlockchain: boolean;

  // Recipient Support
  supportType: "email" | "helpdesk";
  helpdeskUrl: string;

  // Market My Courses
  marketSupportType: "email" | "helpdesk";
}

const defaultFormData: GroupFormData = {
  displayName: "",
  identifier: "",
  courseWebsite: "",
  description: "",
  skills: [],
  category: "",

  issuerName: "",
  website: "",
  defaultCategory: "",
  orgDescription: "",
  linkedInOrgId: "",
  linkedInUrl: "",
  twitterUsername: "",
  facebookUrl: "",
  instagramUsername: "",
  tikTokUsername: "",
  youTubeUsername: "",

  orgLogo: "",
  contactEmail: "",
  bannerImage: "",
  credentialListOrder: "",
  customTweetMessage: "",
  seoTitle: "",
  seoDescription: "",

  recordToBlockchain: false,

  supportType: "email",
  helpdeskUrl: "",

  marketSupportType: "email",

certificateImage: "",
badgeImage: "",
};

// ─── Context ──────────────────────────────────────────────────────────────────

interface GroupFormContextType {
  formData: GroupFormData;
  updateFormData: (fields: Partial<GroupFormData>) => void;
  resetFormData: () => void;
}

const GroupFormContext = createContext<GroupFormContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const GroupFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<GroupFormData>(defaultFormData);

  const updateFormData = (fields: Partial<GroupFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const resetFormData = () => setFormData(defaultFormData);

  return (
    <GroupFormContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </GroupFormContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useGroupForm = () => {
  const context = useContext(GroupFormContext);
  if (!context) throw new Error("useGroupForm must be used within a GroupFormProvider");
  return context;
};