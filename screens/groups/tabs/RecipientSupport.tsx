"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RecipientSupport = () => {
  const [supportType, setSupportType] = useState<"email" | "helpdesk">("helpdesk");

  return (
    <div className="rounded-lg border border-[#EAECF0] p-6 space-y-5">
      <div>
        <h2 className="text-base font-semibold text-[#101828]">Support Requests</h2>
        <p className="text-sm text-[#667085] mt-2">How should users get in touch with you for support or questions?</p>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-[#344054] cursor-pointer">
          <input
            type="radio"
            name="supportType"
            value="email"
            checked={supportType === "email"}
            onChange={() => setSupportType("email")}
            className="h-4 w-4 accent-[#7F56D9]"
          />
          Email your Support Contact
        </label>

        <label className="flex items-center gap-2 text-sm text-[#344054] cursor-pointer">
          <input
            type="radio"
            name="supportType"
            value="helpdesk"
            checked={supportType === "helpdesk"}
            onChange={() => setSupportType("helpdesk")}
            className="h-4 w-4 accent-[#7F56D9]"
          />
          Helpdesk Form
        </label>
      </div>

      {supportType === "helpdesk" && (
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#344054]">Your Helpdesk URL</label>
          <Input placeholder="http://..." className="h-11 border-gray-300" />
        </div>
      )}

      <Button className="py-2 px-12">Save</Button>
    </div>
  );
};

export default RecipientSupport;