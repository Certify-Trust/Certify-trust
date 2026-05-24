"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface EarningCriteria {
  id: string;
  type: string;
  required: boolean;
  description: string;
}

const EarningCriteriaSection = () => {
  const [criteria, setCriteria] = useState<EarningCriteria[]>([
    { id: "1", type: "", required: false, description: "" },
  ]);

  const addCriteria = () => {
    setCriteria((prev) => [
      ...prev,
      { id: Date.now().toString(), type: "", required: false, description: "" },
    ]);
  };

  const removeCriteria = (id: string) => setCriteria((prev) => prev.filter((c) => c.id !== id));

  const updateCriteria = (id: string, field: keyof EarningCriteria, value: string | boolean) =>
    setCriteria((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));

  return (
    <section className="space-y-5 border p-4 border-gray-300 rounded-lg">
      <div>
        <h2 className="text-base font-semibold text-[#101828]">
          Earning Criteria <span className="font-normal text-[#667085]">(Optional)</span>
        </h2>
        <p className="text-sm mt-2 text-[#667085]">
          Define recipient prerequisites for this credential. Appears on the recipient's credential page and your
          public credential page.
        </p>
      </div>

      <div className="space-y-4">
        {criteria.map((c) => (
          <div key={c.id} className="rounded-lg border border-[#EAECF0] bg-[#F8F7FF] p-4">
           <div className="mb-3 flex items-center justify-between">
  <div className="flex items-center gap-3">
    <select
      value={c.type}
      onChange={(e) => updateCriteria(c.id, "type", e.target.value)}
      className="h-9 w-[194px] rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054] focus:outline-none"
    >
      <option value="">Select a type</option>
      <option value="course">Course</option>
      <option value="exam">Exam</option>
      <option value="project">Project</option>
    </select>

    <label className="flex items-center gap-2 text-sm text-[#344054]">
      <input
        type="checkbox"
        checked={c.required}
        onChange={(e) => updateCriteria(c.id, "required", e.target.checked)}
        className="h-4 w-4 rounded border-[#D0D5DD] accent-[#7F56D9]"
      />
      Set as required
    </label>
  </div>

  <button
    type="button"
    onClick={() => removeCriteria(c.id)}
    className="flex h-12 w-12 items-center justify-center rounded-lg hover:bg-[#FEF3F2]"
  >
    <Trash2 size={30} className="text-[#F04438] bg-white rounded-full border p-2 border-gray-300" />
  </button>
</div>

            <RichTextEditor className="bg-white"
              value={c.description}
              onChange={(val) => updateCriteria(c.id, "description", val)}
              rows={3}
            />
          </div>
        ))}

        <Button
          type="button"
          onClick={addCriteria}
          className="flex items-center gap-2 text-sm font-semibold text-[#344054] bg-white border border-gray-300 hover:text-[#7F56D9]"
        >
          <Plus size={16} />
          Add Earning Criteria
        </Button>
      </div>
    </section>
  );
};

export default EarningCriteriaSection;