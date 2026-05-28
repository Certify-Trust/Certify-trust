"use client";

import { Button } from "@/components/ui/button";
import { useGroupForm } from "@/context/GroupFormContext";

const MarketMyCourses = () => {
  const { formData, updateFormData } = useGroupForm();

  return (
    <div className="rounded-lg border border-[#EAECF0] p-6 space-y-5">
      <div>
        <h2 className="text-base font-semibold text-[#101828]">Support Requests</h2>
        <p className="text-sm text-[#667085]">How should users get in touch with you for support or questions?</p>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-[#344054] cursor-pointer">
          <input
            type="radio"
            name="marketSupportType"
            value="email"
            checked={formData.marketSupportType === "email"}
            onChange={() => updateFormData({ marketSupportType: "email" })}
            className="h-4 w-4 accent-[#7F56D9]"
          />
          Email your Support Contact
        </label>

        <label className="flex items-center gap-2 text-sm text-[#344054] cursor-pointer">
          <input
            type="radio"
            name="marketSupportType"
            value="helpdesk"
            checked={formData.marketSupportType === "helpdesk"}
            onChange={() => updateFormData({ marketSupportType: "helpdesk" })}
            className="h-4 w-4 accent-[#7F56D9]"
          />
          Helpdesk Form
        </label>
      </div>

      <Button className="py-2 px-12">Save</Button>
    </div>
  );
};

export default MarketMyCourses;