"use client";

import EmptyStateIcon from "@/assets/icons/EmptyStateIcon";
import { ActionsDropdown } from "@/components/dropdown/ActionsDropDown";
import EmptyState from "@/components/empty";
import DashboardFilter from "@/components/filters/dashboard-filter";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import DesignCard from "@/components/dashboard/design-card";
import useAppSelector from "@/hooks/useAppSelector";
import { removeDesign } from "@/redux/reducers/designSlice";
import useAppDispatch from "@/hooks/useAppDispatch";

const DesignsScreen = () => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const designs = useAppSelector((state) => state.designs.designs);

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
            <Button className="flex h-10.75 items-center gap-2 px-5 font-semibold">
              Create New
              <ChevronDown size={18} />
            </Button>
          }
          items={[
            {
              label: "New Certificate Design",
              onClick: () => push("/dashboard/designs/create"),
            },
            {
              label: "New Badge Design",
              onClick: () => push("/dashboard/designs/create"),
            },
          ]}
        />
      </div>

      <DashboardFilter />

      {designs.length === 0 ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <EmptyState
            icon={<EmptyStateIcon />}
            description="You don’t have any certificate or badge designs yet. Create your first design now!"
            actions={[
              {
                label: "Create Badge Design",
                onClick: () => push("/dashboard/designs/create"),
                variant: "pricing",
              },
              {
                label: "Create Certificate Design",
                onClick: () => push("/dashboard/designs/create"),
              },
            ]}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {designs.map((item, index) => (
            <DesignCard
              key={index}
              href="/dashboard/designs/create"
              onDelete={() => dispatch(removeDesign(item.id))}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DesignsScreen;
