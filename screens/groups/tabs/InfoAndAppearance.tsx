"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGroups } from "@/context/GroupsContext";
import { Plus, Search, AlertCircle, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/RichTextEditor";
import EarningCriteriaSection from "@/components/EarningCriteria";
import CustomInput from "@/components/custom-input/custom-input";
import { useForm, FormProvider } from "react-hook-form";
import { useGroupForm } from "@/context/GroupFormContext";

const AppearanceCard = ({ type }: { type: "certificate" | "badge" }) => {
  const { formData, updateFormData } = useGroupForm();
  const key = type === "certificate" ? "certificateImage" : "badgeImage";
  const image = formData[key];

  return (
    <div
      className="relative flex h-[333px] w-[327px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#D0D5DD] bg-[#F9FAFB] transition hover:border-[#7F56D9] overflow-hidden"
      onClick={() => document.getElementById(`${type}-upload`)?.click()}
    >
      <button className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-sm bg-white shadow-sm">
        <Pencil size={13} className="text-[#344054]" />
      </button>

      {image ? (
        <img src={image} alt={type} className="h-full w-full object-cover" />
      ) : (
        type === "certificate" ? (
          <div className="flex flex-col items-center gap-1 opacity-30">
            <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
              <rect x="1" y="1" width="38" height="30" rx="3" stroke="#667085" strokeWidth="2" />
              <path d="M8 8h24M8 14h16" stroke="#667085" strokeWidth="2" strokeLinecap="round" />
              <circle cx="20" cy="24" r="4" stroke="#667085" strokeWidth="2" />
            </svg>
            <span className="text-[9px] tracking-widest text-[#667085]">CERTIFICATE</span>
            <span className="text-[8px] text-[#667085]">Recipient Name</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 opacity-30">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 4L4 14v10c0 11 8.6 21.3 20 24 11.4-2.7 20-13 20-24V14L24 4Z" stroke="#667085" strokeWidth="2" />
              <rect x="16" y="16" width="16" height="16" rx="2" stroke="#667085" strokeWidth="1.5" />
            </svg>
            <span className="text-[9px] tracking-widest text-[#667085]">ACHIEVEMENT</span>
          </div>
        )
      )}

      <input
        id={`${type}-upload`}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => updateFormData({ [key]: reader.result as string });
            reader.readAsDataURL(file);
          }
        }}
      />
    </div>
  );
};

const SaveGroupButton = () => {
  const router = useRouter();
  const { formData, resetFormData } = useGroupForm();
  const { addGroup } = useGroups();

  const handleSave = () => {
    if (!formData.displayName) {
      alert("Please enter a Display Name before saving.");
      return;
    }

    addGroup({
      displayName: formData.displayName,
      category: formData.defaultCategory || formData.category,
      certificateImage: formData.certificateImage,
      badgeImage: formData.badgeImage,
    });

    resetFormData();
    router.push("/dashboard/groups");
  };

  return (
    <Button className="py-2 px-12" onClick={handleSave}>
      Save
    </Button>
  );
};

const InfoAndAppearance = () => {
    const { formData, updateFormData } = useGroupForm();
  const methods = useForm({
  defaultValues: {
    "display-name": formData.displayName,
    "identifier": formData.identifier,
    "course-website": formData.courseWebsite,
  }
});

  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim()) {
      updateFormData({ skills: [...formData.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    updateFormData({ skills: formData.skills.filter((s) => s !== skill) });
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-10 pb-10">
        {/* Group Information */}
        <section className="space-y-5">
          <div>
            <h2 className="text-base font-semibold text-[#101828]">Group Information</h2>
            <p className="text-sm text-[#667085]">Set up the details for your group</p>
          </div>

          <div>
          <CustomInput
  id="display-name"
  name="display-name"
  type="text"
  label="Display Name"
  inputClass="w-full"
  value={formData.displayName}
  onChange={(e) => updateFormData({ displayName: e.target.value })}
/>
            <p className="text-xs text-[#667085]">Display on and below certificates</p>
          </div>

          <div>
      <CustomInput
  id="identifier"
  name="identifier"
  type="text"
  label="Identifier"
  inputClass="w-full"
  value={formData.identifier}
  onChange={(e) => updateFormData({ identifier: e.target.value })}
/>
            <p className="text-xs text-[#667085]">To identify your group on the dashboard - ex. a business training</p>
          </div>

          <div>
    <CustomInput
  id="course-website"
  name="course-website"
  type="text"
  label="Course Website"
  inputClass="w-full"
  value={formData.courseWebsite}
  onChange={(e) => updateFormData({ courseWebsite: e.target.value })}
/>
            <p className="text-xs text-[#667085]">This connects the credential data record to the details about the credential on your site.</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#344054]">Description</label>
            <RichTextEditor
              value={formData.description}
              onChange={(val) => updateFormData({ description: val })}
              rows={4}
            />
          </div>

          {/* Skills */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#344054]">Skills</label>
            <div className="flex items-center gap-2 rounded-lg border border-[#D0D5DD] px-4 py-2.5">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                placeholder="Enter skills"
                className="flex-1 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:outline-none"
              />
              <button type="button" onClick={addSkill} className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F2F4F7] hover:bg-[#EAECF0]">
                <Plus size={14} className="text-[#344054]" />
              </button>
            </div>
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {formData.skills.map((s) => (
                  <span key={s} className="flex items-center gap-1 rounded-full bg-[#F9F5FF] px-3 py-1 text-xs font-medium text-[#6941C6]">
                    {s}
                    <button onClick={() => removeSkill(s)} className="ml-1 hover:opacity-70">×</button>
                  </span>
                ))}
              </div>
            )}
            <p className="text-xs text-[#667085]">Increase the marketability of your credential by identifying skills these credential-holders needed to demonstrate (or have learned) in the process of earning this credential.</p>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#344054]">Category</label>
            <div className="flex items-center gap-2 rounded-lg border border-[#D0D5DD] px-4 py-2.5">
              <input
                value={formData.category}
                onChange={(e) => updateFormData({ category: e.target.value })}
                placeholder="Type here and then select a category from the list"
                className="flex-1 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:outline-none"
              />
              <Search size={16} className="text-[#98A2B3]" />
            </div>
          </div>
        </section>

        {/* Group Appearance */}
        <section className="space-y-5">
          <div>
            <h2 className="text-base font-semibold text-[#101828]">Group Appearance</h2>
            <p className="text-sm text-[#667085]">Your group needs a badge or certificate design to be displayed. It can have both. If you add both a certificate and a badge, select which you want to be the Primary representation of this credential.</p>
          </div>

          <div className="flex flex-wrap gap-6 justify-center">
            <AppearanceCard type="certificate" />
            <AppearanceCard type="badge" />
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-[#FECDCA] bg-[#FEF3F2] justify-center px-4 py-3 w-fit mx-auto">
            <AlertCircle size={16} className="shrink-0 text-[#F04438]" />
            <p className="text-sm text-[#B42318]">Your group requires a badge or certificate design for display. It can have both.</p>
          </div>
        </section>

        <EarningCriteriaSection />

  <SaveGroupButton/>
      </div>
    </FormProvider>
  );
};

export default InfoAndAppearance;