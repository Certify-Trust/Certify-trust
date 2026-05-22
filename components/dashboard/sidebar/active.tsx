"use client";

import React, { JSX } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarData } from "@/constants/sidebarData";

interface MenuItem {
  title: string;
  className: string;
  icon?: JSX.Element;
  link: string;
}

interface ActiveSidebarProps {
  active: boolean;
  transition: boolean;
}

const ActiveSidebar = ({ active, transition }: ActiveSidebarProps) => {
  const pathname = usePathname();

  const activeIndex = sidebarData.findIndex((item) =>
    pathname.includes(item.link),
  );

  return (
    <div className="flex h-full flex-col text-gray-700">
      <div className="flex-initial px-4">
        <div
          className={`flex grow flex-col gap-2 pl-4 transition-opacity duration-300 ease-in-out ${
            active && !transition ? "opacity-100" : "opacity-0"
          }`}
        >
          {sidebarData.map((item: MenuItem, index: number) => (
            <div key={index} className="transition-all duration-300">
              <Link href={item.link}>
                <div
                  className={`flex cursor-pointer items-center gap-3 text-gray-700 transition-all duration-300 ease-in-out hover:rounded-md hover:bg-gray-50 hover:text-gray-900 ${
                    index === activeIndex
                      ? "h-10 rounded-md bg-gray-50 py-2 text-gray-900"
                      : "h-10 py-2"
                  }`}
                >
                  <div className={`pl-1 ${item.className}`}>{item.icon}</div>

                  <p className="text-sm font-semibold">{item.title}</p>
                </div>

                {/* {(index === 1 || index === 4) && (
                  <hr className="my-4 border-t border-gray-200" />
                )} */}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveSidebar;
