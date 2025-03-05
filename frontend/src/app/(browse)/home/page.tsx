"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GridBackground } from "@/components/ui/grid-background";
import { Sidebar } from "./_components/sidebar";
import { ImageIcon, MoreHorizontal, PenSquare } from "lucide-react";

import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [generatedQuery, setGeneratedQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const generateSqlQuery = async () => {
    try {
      const response = await axios.post("http://localhost:4000/generatesql", {
        text: inputValue,
      });
      
      if(response.status !== 200) {
        console.error("Failed to generate SQL query");
        return;
      }
      
      setGeneratedQuery(response.data.sql_query);
    } catch (error) {
      console.error("Error generating SQL query:", error);
    }
  };

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
                  value={inputValue}
                  onChange={handleInputChange}
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
                  onClick={generateSqlQuery}
                  className="bg-yellow-500 text-gray-100 hover:bg-green-500 transition-all duration-200 cursor-pointer"
                >
                  <PenSquare className="w-4 h-4 mr-2" />
                  Generate Query
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
            
            <div className="bg-gray-900/50 rounded-lg">
              <h2 className="px-4 py-2 text-lg font-semibold text-white">Generated SQL Query</h2>
                
              <code className="p-3 w-full block min-h-24 border-t-[2.5px] border-green-400 text-sm text-gray-300">{generatedQuery}</code>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
