"use client";
import DashboardHeader from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
// import CalendarSchedule from '@/components/layout/dashboardNav/calendar';
// import Header from '@/components/layout/dashboardNav/header';
// import PopularPost from '@/components/layout/dashboardNav/popularPost';
// import Records from '@/components/layout/dashboardNav/records';
// import Navbar from '@/components/layout/dashboardNav/sidebar';
import React from "react";

interface DashLayoutProps {
  children: React.ReactNode;
  records?: boolean;
  post?: boolean;
  calendar?: boolean;
}

export default function DashboardLayout({
  children,
  records = false,
  post = false,
  calendar = false,
}: DashLayoutProps) {
  return (
    <main>
      <div className="flex min-h-screen">
        <div>
          <Sidebar />
        </div>
        <div className="w-full bg-white">
          <DashboardHeader />
          <div className="custom-scrollbar flex overflow-y-scroll">
            <div className="flex-1 pr-2 pb-7 pl-4 sm:pr-5 md:pr-6 lg:pl-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
