"use client";
import EmptyState from "@/components/empty";
import { useRouter } from "next/navigation";
import DashboardFilter from "@/components/filters/dashboard-filter";
import { Button } from "@/components/ui/button";
import EmptyStateIcon from "@/assets/icons/EmptyStateIcon";

const GroupsScreen = () => {
  const { push } = useRouter();
  return (
    <div className="min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="flex items-center text-2xl font-semibold text-[#101828]">
            Groups
          </h1>
        </div>

        <Button className="h-10.75">Create Group</Button>
      </div>

      <DashboardFilter />

      <div className="flex min-h-[50vh] items-center justify-center">
        <EmptyState
          icon={<EmptyStateIcon />}
          description="You don’t have any groups yet. Create your first group now!"
          actions={[
            {
              label: "Create Group",
              onClick: () => console.log("Group"),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default GroupsScreen;
