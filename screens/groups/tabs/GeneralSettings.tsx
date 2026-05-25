"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/RichTextEditor";
import { ExternalLink } from "lucide-react";
import RecipientSupport from "./RecipientSupport";
import MarketMyCourses from "./MarketmyCourses";
import BrandSettings from "./BrandSettings";
import CustomInput from "@/components/custom-input/custom-input";
import { useForm, FormProvider } from "react-hook-form";

const TABS = ["General Settings", "Brand Settings", "Recipient Support", "Market My Courses"] as const;
type Tab = (typeof TABS)[number];

// ─── General Information ──────────────────────────────────────────────────────

const GeneralInformation = () => {
  const methods = useForm();
  const [description, setDescription] = useState("");

  return (
    <FormProvider {...methods}>
      <section className="space-y-5 border p-4 border-gray-300 rounded-lg">
        <div>
          <h2 className="text-base font-semibold text-[#101828]">General Information</h2>
          <p className="text-sm text-[#667085]">Set up the details for general information</p>
        </div>

        <div>
          <CustomInput id="issuer-name" type="text" label="Issuer Name" inputClass="w-full" />
          <p className="text-xs text-[#667085]">Name of the credential issuer displayed on credential</p>
        </div>

        <div>
          <CustomInput id="website" type="text" label="Website" inputClass="w-full" />
          <p className="text-xs text-[#667085]">Website for your organization</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#344054]">Default Category</label>
          <select className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054] focus:outline-none">
            <option value=""></option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#344054]">Description</label>
          <p className="text-xs text-[#667085]">A description for your organization</p>
          <RichTextEditor value={description} onChange={setDescription} placeholder="Type description here." rows={4} />
        </div>

        <Button className="h-10 px-8 text-white hover:bg-[#6941C6]">Save</Button>
      </section>
    </FormProvider>
  );
};

// ─── Social Media Accounts ────────────────────────────────────────────────────

const SocialMediaAccounts = () => {
  const methods = useForm();
  const fields = [
    "LinkedIn Org. ID",
    "LinkedIn URL",
    "Twitter Username",
    "Facebook URL",
    "Instagram Username",
    "TikTok Username",
    "YouTube Username",
  ];

  return (
    <FormProvider {...methods}>
      <section className="space-y-5 border p-4 border-gray-300 rounded-lg">
        <div>
          <h2 className="text-base font-semibold text-[#101828]">Social Media Accounts</h2>
          <p className="text-sm mt-2 text-[#667085]">Link your social channels to your issuer page</p>
        </div>

        {fields.map((field) => (
          <CustomInput
            key={field}
            id={field.toLowerCase().replace(/\s/g, "-")}
            type="text"
            label={field}
            inputClass="w-full"
          />
        ))}

        <Button className="h-10 px-8 text-white hover:bg-[#6941C6]">Save</Button>
      </section>
    </FormProvider>
  );
};

// ─── API Settings ─────────────────────────────────────────────────────────────

const ApiSettings = () => {
  const [autoPublish, setAutoPublish] = useState(true);

  return (
    <section className="space-y-5 border p-4 border-gray-300 rounded-lg">
      <div>
        <h2 className="text-base font-semibold text-[#101828]">API Settings</h2>
        <p className="text-sm text-[#667085]">Integrate with Certifytrusts using our built-in API</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-[#344054]">Publish Settings</label>
        <label className="flex items-center gap-2 text-sm text-[#344054]">
          <input
            type="checkbox"
            checked={autoPublish}
            onChange={(e) => setAutoPublish(e.target.checked)}
            className="h-4 w-4 rounded border-[#D0D5DD] accent-[#7F56D9]"
          />
          Automatically publish credentials created via the API
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#344054]">
          Create and assign API keys for your departments
        </label>
        <div className="flex items-center gap-2 rounded-lg border border-[#5324FB] bg-[#F8F7FF] px-4 py-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="#667085" strokeWidth="1.333" />
            <path d="M8 7v4M8 5h.007" stroke="#667085" strokeWidth="1.333" strokeLinecap="round" />
          </svg>
          <p className="flex-1 text-sm text-[#667085]">
            To access API Keys management, purchase the addon in the new Launch plan.{" "}
            <a href="#" className="inline-flex items-center gap-1 font-medium text-[#7F56D9] hover:underline">
              Purchase API addon <ExternalLink size={12} />
            </a>
          </p>
        </div>

        <button
          disabled
          className="mt-1 rounded-lg border border-[#EAECF0] px-4 py-2 text-sm text-[#98A2B3] cursor-not-allowed"
        >
          Manage API Keys
        </button>
      </div>

      <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-[#7F56D9] hover:underline">
        View our API documentation
      </a>
    </section>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

const GeneralSettingsScreen = () => {
  const [activeTab, setActiveTab] = useState<Tab>("General Settings");

  return (
    <div className="min-h-screen space-y-5">
      <h1 className="text-2xl font-semibold text-[#101828]">General Settings</h1>

      <div className="border-b border-[#EAECF0]">
        <nav className="flex w-fit gap-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "whitespace-nowrap pb-3 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "border-b-2 border-[#7F56D9] text-[#5324FB]"
                  : "text-[#667085] hover:text-[#344054]"
              )}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "General Settings" && (
        <div className="space-y-10 pb-10">
          <GeneralInformation />
          <SocialMediaAccounts />
          <ApiSettings />
        </div>
      )}
      {activeTab === "Brand Settings" && <BrandSettings />}
      {activeTab === "Recipient Support" && <RecipientSupport />}
      {activeTab === "Market My Courses" && <MarketMyCourses />}
    </div>
  );
};

export default GeneralSettingsScreen;