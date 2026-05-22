"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ActiveSidebar from "./active";
import InactiveSidebar from "./inactive";
import { CollapseIcon, ExpandIcon } from "@/assets/dashboard/sidebarIcons";
import Logo from "@/assets/icons/Logo";

function Sidebar() {
  const [active, setActive] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;

    const savedState = localStorage.getItem("sidebarActive");

    if (savedState !== null) {
      return JSON.parse(savedState);
    }

    return window.innerWidth > 1000;
  });

  const [transition, setTransition] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setActive(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleActive = () => {
    setTransition(true);

    setActive((prev) => {
      const newState = !prev;
      localStorage.setItem("sidebarActive", JSON.stringify(newState));
      return newState;
    });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setTransition(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`navbar ${
        active
          ? "sticky top-0 left-0 w-[280px] max-[1280px]:w-64"
          : "sticky top-0 left-0 w-20"
      } h-screen border-r border-gray-200 bg-[#fff] transition-all duration-300 ease-in-out`}
    >
      <div className="relative flex max-h-screen flex-col border-gray-300 pt-0">
        <div className="flex items-center justify-between px-3">
          <Link href="/dashboard/overview">
            {active ? (
              <div className="py-5 pl-0">
                <Logo height={43} width={190} />
              </div>
            ) : (
              <div className="py-2 pl-3"></div>
            )}
          </Link>

          <div
            onClick={toggleActive}
            className="absolute top-4 right-0 cursor-pointer"
          >
            {active ? <CollapseIcon /> : <ExpandIcon />}
          </div>
        </div>

        <div
          className={`${
            active ? "mt-7" : "mt-18"
          } transition-all duration-300 ease-in-out`}
        >
          {active ? (
            <ActiveSidebar active={active} transition={transition} />
          ) : (
            <InactiveSidebar active={toggleActive} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
