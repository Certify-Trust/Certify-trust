"use client";

import EmptyStateIcon from "@/assets/icons/EmptyStateIcon";
import { ActionsDropdown } from "@/components/dropdown/ActionsDropDown";
import EmptyState from "@/components/empty";
import DashboardFilter from "@/components/filters/dashboard-filter";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const DesignsScreen = () => {
  return (
    <div className="min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="flex items-center text-2xl font-semibold text-[#101828]">
            Designs
          </h1>
        </div>

        <ActionsDropdown
          trigger={
            <Button className="flex h-[43px] items-center gap-2 px-5 font-semibold">
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

      <DashboardFilter />

      <div className="flex min-h-[50vh] items-center justify-center">
        <EmptyState
          icon={<EmptyStateIcon />}
          description="You don’t have any certificate or badge designs yet. Create your first design now!"
          actions={[
            {
              label: "Create Badge Design",
              onClick: () => console.log("badge"),
              variant: "pricing",
            },
            {
              label: "Create Certificate Design",
              onClick: () => console.log("certificate"),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default DesignsScreen;
