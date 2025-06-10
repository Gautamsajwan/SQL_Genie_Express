import React, { ReactNode } from "react";
import Navbar from "./_components/navbar";
import { Sidebar } from "./_components/sidebar/index";

const BrowseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#161718] min-h-screen">
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <div className="pl-64 w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BrowseLayout;
