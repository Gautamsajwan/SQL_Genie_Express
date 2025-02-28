"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GridBackground } from "@/components/ui/grid-background";
import { Sidebar } from "./_components/sidebar";
import {
  ImageIcon,
  PenSquare,
  FileText,
  Eye,
  MoreHorizontal,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <main className="flex-1 relative overflow-hidden">
        <GridBackground />
        <div className="relative h-full flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-3xl space-y-8">
            <h1 className="text-3xl font-semibold text-white text-center">
              Tell us what kind of SQL query to generate?
            </h1>

            <div className="space-y-4">
              <div className="relative">
                <Input
                  placeholder="Input what data you want"
                  className="w-full h-14 bg-gray-900/50 border-gray-800 text-white placeholder-gray-400 px-4 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant="ghost"
                  className="bg-gray-900/50 text-gray-300 hover:bg-gray-800/50"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Upload Schema
                </Button>
                <Button
                  variant="ghost"
                  className="bg-gray-900/50 text-gray-300 hover:bg-gray-800/50"
                >
                  <PenSquare className="w-4 h-4 mr-2" />
                  Generate Query
                </Button>
                <Button
                  variant="ghost"
                  className="bg-gray-900/50 text-gray-300 hover:bg-gray-800/50"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Query History
                </Button>
                <Button
                  variant="ghost"
                  className="bg-gray-900/50 text-gray-300 hover:bg-gray-800/50"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Results
                </Button>
                <Button
                  variant="ghost"
                  className="bg-gray-900/50 text-gray-300 hover:bg-gray-800/50"
                >
                  <MoreHorizontal className="w-4 h-4 mr-2" />
                  More Options
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
