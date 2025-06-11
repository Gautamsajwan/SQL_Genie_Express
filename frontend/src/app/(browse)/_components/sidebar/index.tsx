"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cable } from "lucide-react";
import { useConnectionStore } from "@/store/connection-store";
import nextDynamic from 'next/dynamic';

const DbConnectionModal = nextDynamic(() =>
  import('./dbConnectModal').then((mod) => ({ default: mod.DbConnectionModal })), {
    ssr: false,
    loading: () => <div>Loading modal...</div>,
});

export function Sidebar() {
  const { detailsAvailable, dbURL, createdAt, eraseConnectionDetails } = useConnectionStore(
    (state) => state,
  )

  const handleDisconnect = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("connectionDetails");
      localStorage.removeItem("dbSchema");
      eraseConnectionDetails();
    }
  }

  return (
    <div className="fixed top-0 left-0 z-1 h-screen w-64 bg-[rgb(11,15,20)] border-r-[3px] border-gray-800 p-4">
      <div className="space-y-3 pt-16">
        {detailsAvailable ? (
          <Button
            variant="default"
            className="w-full bg-red-400/80 hover:bg-red-400 transition"
            onClick={handleDisconnect}
          >
            Disconnect database
          </Button>
        ) : (
          <DbConnectionModal />
        )}

        <div>
          <Card className="bg-[#13171a] text-white border-t rounded-lg border-slate-800">
            <CardHeader className="px-0 pb-1 border-b-2 border-gray-700">
              <CardTitle className="px-4 font-medium text-center">
                Connection Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {detailsAvailable ? (
                <div className="text-slate-300 space-y-3">
                  <div className="space-y-1">
                    <strong className="pl-[1px] block font-medium">
                      Database URL
                    </strong>
                    <p className="p-2 w-full outline outline-indigo-700 text-slate-400 bg-[#15262e] rounded-sm text-sm break-words">
                      {dbURL}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <strong className="pl-[1px] block font-medium">
                      Connected At
                    </strong>{" "}
                    <p className="p-2 w-full outline outline-indigo-700 bg-[#15262e] rounded-sm text-sm break-words">
                      {new Date(createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-x-2 text-slate-300">
                  <Cable className="m-auto w-7 h-7 text-red-400"/>
                  <p className="pt-2 text-xs">Connection inactive</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* <SidebarItem
          icon={<Database size={20} className="text-red-400" />}
          text="Upload Schema"
        />
        <SidebarItem
          icon={<BadgePlus size={20} className="text-blue-400" />}
          text="About"
        /> */}
      </div>
    </div>
  );
}

// function SidebarItem({
//   icon,
//   text,
//   active = false,
// }: {
//   icon: React.ReactNode;
//   text: string;
//   active?: boolean;
// }) {
//   return (
//     <div
//       className={`flex items-center space-x-3 px-3 py-3 rounded-lg cursor-pointer transition-colors ${
//         active
//           ? "bg-gray-800 text-white"
//           : "text-gray-100 hover:bg-gray-800/50 hover:text-gray-200"
//       }`}
//     >
//       {icon}
//       <span className="text-sm font-medium">{text}</span>
//     </div>
//   );
// }
