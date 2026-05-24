import React from "react";
import { Button } from "../ui/button";
import EmptyStateIcon from "@/assets/icons/EmptyStateIcon";

const EmptyState = () => {
  return (
    <div className="mx-auto mt-8 flex w-full flex-col items-center justify-center space-y-4">
      <EmptyStateIcon />

      <p className="text-center text-sm font-medium">
        You don’t have any certificate or badge designs yet. Create your first
        design now!
      </p>

      <div className="mt-6 flex w-full flex-col gap-6 sm:max-w-105.5 sm:flex-row">
        <Button size="full" variant="pricing" className="flex-1">
          Create Badge Design
        </Button>
        <Button size="full" className="flex-1">
          Create Certificate Design
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
