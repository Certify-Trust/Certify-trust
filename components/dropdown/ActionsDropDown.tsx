"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export type ActionItem = {
  label: string | ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  icon?: ReactNode;
};

type ActionsDropdownProps = {
  trigger?: ReactNode;
  label?: string;
  items: ActionItem[];
};

export function ActionsDropdown({
  trigger,
  label = "",
  items,
}: ActionsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ?? <Button variant="outline">{label}</Button>}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 bg-white">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{label}</DropdownMenuLabel>

          {items.map((item, index) => (
            <DropdownMenuItem
              key={index}
              disabled={item.disabled}
              onClick={item.onClick}
              className={
                item.destructive
                  ? "text-red-600"
                  : "mb-1 flex cursor-pointer items-center gap-2 px-2.5 py-2.5 font-medium whitespace-nowrap text-gray-700 transition-all duration-300 hover:bg-gray-50"
              }
            >
              {item.icon && <span className="text-gray-500">{item.icon}</span>}
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* <DropdownMenuItem disabled className="text-xs text-gray-400">
          More actions
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
