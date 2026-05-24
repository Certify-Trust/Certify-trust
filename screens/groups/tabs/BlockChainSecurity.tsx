"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const BlockchainSecurity = () => {
  const [recordToBlockchain, setRecordToBlockchain] = useState(false);

  return (
    <section>
<div className="space-y-5 border border-gray-300 p-5 rounded-lg mb-5">
      <div>
        <h2 className="text-[18px] font-semibold text-[#101828]">Blockchain Security</h2>
        <p className="text-[18px] mt-2 text-[#667085]">
          Reduce fraud and increase third-party confidence in authenticity by sealing a record of issuing these
          credentials in a digital ledger to be absolutely certain a credential record has not been altered.
        </p>
      </div>

      <label className="flex items-center gap-2 text-[14px] text-[#344054]">
        <input
          type="checkbox"
          checked={recordToBlockchain}
          onChange={(e) => setRecordToBlockchain(e.target.checked)}
          className="h-4 w-4 rounded border-[#D0D5DD] accent-[#7F56D9]"
        />
        Record credentials to the Blockchain.
      </label>

      {recordToBlockchain && (
        <div className="flex items-start gap-2 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] px-4 py-3">
          <Info size={16} className="mt-0.5 shrink-0 text-[#667085]" />
          <p className="text-sm text-[#344054]">
            It can take up to 48 hours for a Credential to be added to the Blockchain. This won't stop recipients
            from using their credentials - just from validating the Blockchain record.
          </p>
        </div>
      )}
<div className="flex items-center gap-2 rounded-lg border border-[#5324FB] bg-[#F8F7FF] px-4 py-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="#667085" strokeWidth="1.333" />
            <path d="M8 7v4M8 5h.007" stroke="#667085" strokeWidth="1.333" strokeLinecap="round" />
          </svg>
          <p className="flex-1 text-sm text-[#667085]">
            It can take up to 48 hours for a Credential to be added to the Blockchain. This won't stop recipients from using their credentials - just from validating the Blockchain record.
          </p>
        </div>

    </div>
          <Button className="py-2 px-12">Save</Button>
    </section>
    
  );
};

export default BlockchainSecurity;