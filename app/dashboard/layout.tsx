"use client";
import DashboardHeader from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
// import CalendarSchedule from '@/components/layout/dashboardNav/calendar';
// import Header from '@/components/layout/dashboardNav/header';
// import PopularPost from '@/components/layout/dashboardNav/popularPost';
// import Records from '@/components/layout/dashboardNav/records';
// import Navbar from '@/components/layout/dashboardNav/sidebar';
import React from "react";
import { CredentialsProvider } from "@/context/CredentialsContext";

interface DashLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashLayoutProps) {
  return (
    <main>
      <div className="flex min-h-screen">
        <div>
          <Sidebar />
        </div>
        <div className="w-full bg-white">
          <DashboardHeader />
          <div className="custom-scrollbar flex overflow-y-scroll">
            <div className="mt-8 mr-2 ml-4 flex-1 pb-7 sm:mr-5 md:mr-6 lg:ml-7.5">
               <CredentialsProvider>
                {children}
              </CredentialsProvider>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
