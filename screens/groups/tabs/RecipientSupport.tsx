"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGroupForm } from "@/context/GroupFormContext";

const RecipientSupport = () => {
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
            name="supportType"
            value="email"
            checked={formData.supportType === "email"}
            onChange={() => updateFormData({ supportType: "email" })}
            className="h-4 w-4 accent-[#7F56D9]"
          />
          Email your Support Contact
        </label>

        <label className="flex items-center gap-2 text-sm text-[#344054] cursor-pointer">
          <input
            type="radio"
            name="supportType"
            value="helpdesk"
            checked={formData.supportType === "helpdesk"}
            onChange={() => updateFormData({ supportType: "helpdesk" })}
            className="h-4 w-4 accent-[#7F56D9]"
          />
          Helpdesk Form
        </label>
      </div>

      {formData.supportType === "helpdesk" && (
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#344054]">Your Helpdesk URL</label>
          <Input
            placeholder="http://..."
            value={formData.helpdeskUrl}
            onChange={(e) => updateFormData({ helpdeskUrl: e.target.value })}
            className="h-11"
          />
        </div>
      )}

      <Button className="py-2 px-12">Save</Button>
    </div>
  );
};

export default RecipientSupport;