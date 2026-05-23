import React, { JSX, ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Tab {
  value: string;
  label: string | ReactNode;
  content: ReactNode;
}

interface CustomTabProps {
  tabs: Tab[];
  defaultValue: string;
  className?: string;
  onValueChange?: (value: string) => void;
}

function CustomTab({
  tabs,
  defaultValue,
  className,
  onValueChange,
}: CustomTabProps): JSX.Element {
  if (!tabs || tabs.length < 2 || tabs.length > 10) {
    throw new Error("Invalid number of tabs. Must be between 2 and 10.");
  }

  return (
    <div>
      <Tabs
        defaultValue={defaultValue}
        className={className}
        onValueChange={onValueChange}
      >
        <TabsList className="mx-auto flex h-auto w-full max-w-[470px] flex-wrap justify-center rounded-lg border-none bg-gray-100 text-gray-500 min-[1044px]:h-14 min-[1044px]:flex-nowrap">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="h-10 w-full cursor-pointer justify-center text-sm data-[state=active]:rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm sm:w-full sm:text-base"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent
            className="flex flex-col justify-center"
            key={tab.value}
            value={tab.value}
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default CustomTab;
