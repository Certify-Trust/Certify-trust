"use client";

import { ActionsDropdown } from "@/components/dropdown/ActionsDropDown";
import EmptyState from "@/components/empty";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";

const DesignsScreen = () => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="flex items-center text-2xl font-semibold text-[#101828]">
            Designs
          </h1>
        </div>

        <ActionsDropdown
          trigger={
            <Button className="flex h-11 items-center gap-2 rounded-md px-5 font-semibold">
              Create New
              <ChevronDown size={18} />
            </Button>
          }
          items={[
            {
              label: "New Certificate Design",
              onClick: () => console.log("object"),
            },
            {
              label: "New Badge Design",
              onClick: () => console.log("New Invoice"),
            },
          ]}
        />
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        {/* Search */}
        <div className="relative w-full md:w-[260px]">
          <Search
            size={18}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search for design name..."
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pr-4 pl-10 text-sm transition outline-none focus:border-gray-500"
          />
        </div>

        {/* Collection Dropdown */}
        <button className="flex items-center justify-between gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 md:w-[180px]">
          <span>Collections</span>
          <ChevronDown size={18} />
        </button>

        {/* Appearance Dropdown */}
        <button className="flex items-center justify-between gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 md:w-[180px]">
          <span>Appearance</span>
          <ChevronDown size={18} />
        </button>
      </div>

      <EmptyState />
    </div>
  );
};

export default DesignsScreen;
