"use client";

import { useState } from "react";
import EmptyState from "@/components/empty";
import { useRouter } from "next/navigation";
import DashboardFilter from "@/components/filters/dashboard-filter";
import { Button } from "@/components/ui/button";
import EmptyStateIcon from "@/assets/icons/EmptyStateIcon";
import { useGroups } from "@/context/GroupsContext";
import { Settings, Plus, MoreHorizontal } from "lucide-react";

const GROUPS_PER_PAGE = 5;

const GroupsScreen = () => {
  const { push } = useRouter();
  const { groups } = useGroups();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(groups.length / GROUPS_PER_PAGE);
  const paginatedGroups = groups.slice(
    (currentPage - 1) * GROUPS_PER_PAGE,
    currentPage * GROUPS_PER_PAGE
  );

  const handleCreateGroup = () => {
    push("/dashboard/groups/create");
  };

  const getThumbnail = (group: { certificateImage: string; badgeImage: string }) => {
    if (group.certificateImage) return group.certificateImage;
    if (group.badgeImage) return group.badgeImage;
    return null;
  };

  return (
    <div className="min-h-screen space-y-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <h1 className="text-2xl font-semibold text-[#101828]">Groups</h1>
        <Button className="h-10" onClick={handleCreateGroup}>
          Create Group
        </Button>
      </div>

      <DashboardFilter />

      {groups.length === 0 ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <EmptyState
            icon={<EmptyStateIcon />}
            description="You don't have any groups yet. Create your first group now!"
            actions={[{ label: "Create Group", onClick: handleCreateGroup }]}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Group Cards */}
          {paginatedGroups.map((group) => {
            const thumbnail = getThumbnail(group);
            return (
              <div
                key={group.id}
                className="flex items-center gap-4 rounded-lg border border-[#EAECF0] bg-white p-4"
              >
                {/* Thumbnail */}
                <div className="flex h-[90px] w-[90px] shrink-0 items-center justify-center rounded-lg border border-[#EAECF0] bg-[#F9FAFB] overflow-hidden">
                  {thumbnail ? (
                    <img src={thumbnail} alt={group.displayName} className="h-full w-full object-cover" />
                  ) : (
                    <div className="text-xs text-[#667085]">No image</div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 space-y-1">
                  <h3 className="text-base font-semibold text-[#101828]">{group.displayName}</h3>
                  {group.category && (
                    <p className="text-sm text-[#667085]">{group.category}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-[#667085]">
                    <span>{group.credentialsCount} Credentials</span>
                    {group.unpublishedCount > 0 && (
                      <span className="text-[#F04438] font-medium">
                        {group.unpublishedCount} Unpublished
                      </span>
                    )}
                    <span>Updated {group.updatedAt}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="h-9 gap-1 text-sm"
                    onClick={() => push(`/dashboard/groups/${group.id}/credentials/create`)}
                  >
                    Create Credentials <Plus size={14} />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-9 gap-1 text-sm"
                    onClick={() => push(`/dashboard/groups/${group.id}/settings`)}
                  >
                    Group Settings <Settings size={14} />
                  </Button>
                  <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EAECF0] hover:bg-[#F2F4F7]">
                    <MoreHorizontal size={16} className="text-[#344054]" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Pagination */}
         <div className="fixed bottom-0 left-[280px] right-0 max-[1280px]:left-64 flex items-center justify-between border-t border-[#EAECF0] bg-white px-8 py-4">
  <span className="text-sm text-[#667085]">
    Page {currentPage} of {totalPages}
  </span>
  <div className="flex gap-2">
    <Button
      variant="outline"
      className="h-9"
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((p) => p - 1)}
    >
      Previous
    </Button>
    <Button
      variant="outline"
      className="h-9"
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((p) => p + 1)}
    >
      Next
    </Button>
  </div>
</div>
        </div>
      )}
    </div>
  );
};

export default GroupsScreen;