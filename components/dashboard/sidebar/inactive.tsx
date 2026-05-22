"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip } from "react-tooltip";
import { sidebarData } from "@/constants/sidebarData";

type props = {
  active: () => void;
};

function InactiveSidebar({ active }: props) {
  const [isHovered, setIsHovered] = useState(false);
  //   const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const pathname = usePathname();

  //   useEffect(() => {
  //     const activeItemIndex = sidebarData.findIndex((item) =>
  //       pathname.includes(item.link),
  //     );
  //     setActiveIndex(activeItemIndex >= 0 ? activeItemIndex : null);
  //   }, [pathname]);

  const activeIndex = sidebarData.findIndex((item) =>
    pathname.includes(item.link),
  );

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <div>
      <div className="grow">
        {sidebarData.map((group, index) => (
          <div key={index} className="my-4 flex flex-col items-center px-8">
            <Link href={group.link}>
              <div
                className={`flex cursor-pointer items-center gap-3 transition-all duration-300 ease-in-out hover:rounded-md hover:bg-gray-50 ${
                  index === activeIndex
                    ? "h-[40px] rounded-md border border-transparent bg-gray-50 px-4 py-2"
                    : "h-[40px] px-4 py-2"
                }`}
                data-tooltip-id={`${index}`}
                data-tooltip-content={`${group.title}`}
                data-tooltip-float
                data-tooltip-place="top"
                data-tooltip-position-strategy="fixed"
              >
                <div className="">{group?.icon}</div>
              </div>
              {/* {(index === 1 || index === 4) && (
                <hr className="my-4 border-t border-gray-200" />
              )} */}
            </Link>

            <Tooltip
              id={`${index}`}
              place="top"
              style={{
                backgroundColor: "#EAECF0",
                color: "#222",
                zIndex: 99999,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default InactiveSidebar;
