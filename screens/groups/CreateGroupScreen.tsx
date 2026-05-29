"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import InfoAndAppearance from "@/screens/groups/tabs/InfoAndAppearance";
import GeneralSettings from "@/screens/groups/tabs/GeneralSettings";
import BlockchainSecurity from "./tabs/BlockChainSecurity";

const TABS = [
  "Info & Appearance",
  "General Settings",
  "Visibility",
  "Blockchain Security",
  "Advance Security",
] as const;

type Tab = (typeof TABS)[number];

const CreateGroupScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("Info & Appearance");

  return (
    <div className="min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.back()}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#F2F4F7]"
          >
            <ChevronLeft size={18} className="text-[#344054]" />
          </button>
          <h1 className="text-2xl font-semibold text-[#101828]">Groups Settings</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10">Create Credentials</Button>
          <Button variant="outline" className="h-10">Update Credentials</Button>
          <Button variant="outline" className="h-10">View Credentials (0)</Button>
     <Button
  onClick={() => router.push("/dashboard/groups/create/preview")}
  className="h-10 bg-[#7F56D9] text-white hover:bg-[#6941C6]"
>
  Preview
</Button>
        </div>
      </div>

      {/* Tabs */}
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

      {/* Tab Content */}
    {activeTab === "Info & Appearance" && <InfoAndAppearance />}
{activeTab === "General Settings" && <GeneralSettings />}
{activeTab === "Blockchain Security" && <BlockchainSecurity />}
{activeTab !== "Info & Appearance" && activeTab !== "General Settings" && activeTab !== "Blockchain Security" && (
  <div className="flex min-h-[40vh] items-center justify-center text-[#667085]">
    <p>{activeTab} settings coming soon.</p>
  </div>
)}
    </div>
  );
};

export default CreateGroupScreen;