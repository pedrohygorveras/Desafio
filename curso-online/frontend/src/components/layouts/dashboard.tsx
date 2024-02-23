"use client";

import React, { useState } from "react";

import { Sidebar } from "@/components/sidebar";
import { DashboardNavbar } from "@/components/navbar/dashboard";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-80 z-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <div className="px-4 mt-4">
          <DashboardNavbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <main className="overflow-x-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export { DashboardLayout };
