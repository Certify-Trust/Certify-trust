"use client";

import DashboardHeader from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout = pathname === "/dashboard/designs/create";

  return (
    <main>
      <div className="flex min-h-screen">
        {!hideLayout && <Sidebar />}

        <div className="w-full bg-white">
          {!hideLayout && <DashboardHeader />}

          <div className="custom-scrollbar flex overflow-y-scroll">
            <div
              className={cn(
                "flex-1",
                !hideLayout && "mt-8 mr-2 ml-4 pb-7 sm:mr-5 md:mr-6 lg:ml-7.5",
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
