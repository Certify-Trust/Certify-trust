import React from "react";
import { Button } from "../ui/button";

type EmptyStateAction = {
  label: string;
  onClick: () => void;
  variant?: React.ComponentProps<typeof Button>["variant"];
};

type EmptyStateProps = {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  actions?: EmptyStateAction[];
  className?: string;
};

const EmptyState = ({
  icon,
  title,
  description,
  actions = [],
  className = "",
}: EmptyStateProps) => {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center text-center ${className}`}
    >
      {icon}

      {title && <h2 className="mt-3 text-lg font-semibold">{title}</h2>}

      {description && (
        <p className="text-muted-foreground mt-2 text-sm font-medium">
          {description}
        </p>
      )}

      <div className="mt-6 flex w-full max-w-md flex-col justify-center gap-4 sm:flex-row">
        {actions.map((action, index) => (
          <Button
            key={index}
            className={actions.length > 1 ? "flex-1" : "w-auto"}
            variant={action.variant}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EmptyState;
