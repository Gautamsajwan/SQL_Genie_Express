"use client";

import { useState } from "react";
import { Unplug, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomSpinner from "@/components/ui/customSpinner";
import { useConnectionStore } from "@/store/connection-store";

interface DbConnectionModalProps {
  triggerButtonText?: string;
}

export function DbConnectionModal({
  triggerButtonText = "Connect to Database",
}: DbConnectionModalProps) {
  const { setConnectionDetails } = useConnectionStore((state) => state);

  const [connectionString, setConnectionString] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const setLocalStorageItem = (key: string, value: string) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error(`Error setting localStorage item ${key}:`, error);
      }
    }
  };

  const handleConnect = async () => {
    if (!connectionString) {
      alert("Please enter a connection string");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/fetch-schema`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ connectionString }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch schema");
      }

      const data = await response.json();
      setLocalStorageItem("dbSchema", JSON.stringify(data.schema));
      
      const connectionDetails = {
        connectionString: connectionString.trim(),
        connectedAt: new Date().toISOString(),
      };
      
      setLocalStorageItem("connectionDetails", JSON.stringify(connectionDetails));
      
      setConnectionDetails(connectionString, new Date().toISOString());

      setOpen(false);
    } catch (error) {
      console.error("Error connecting to database:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <CustomSpinner />}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="default"
            className="w-full bg-indigo-400/70 hover:bg-indigo-400/90 transition"
          >
            {triggerButtonText}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-[#13171a] text-white border-t border-slate-800 [&>div:first-child]:bg-gray-400 [&>div:first-child]:h-1.5">
          <div className="mx-auto w-full max-w-md">
            <DrawerHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Unplug className="h-8 w-8 text-green-500" />
                <DrawerTitle className="text-white text-lg">
                  Connect to Database
                </DrawerTitle>
              </div>
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-sm text-slate-200 hover:text-white hover:bg-slate-500"
                >
                  <X className="h-5 w-5" />
                </Button>
              </DrawerClose>
            </DrawerHeader>

            <div className="px-4">
              <DrawerDescription className="text-slate-300">
                Enter your database connection string to connect
              </DrawerDescription>
              <div className="mt-4 grid gap-2 py-2">
                <Label htmlFor="connection-string" className="text-slate-300">
                  Connection String
                </Label>
                <Input
                  id="connection-string"
                  placeholder="postgresql://username:password@localhost:5432/database"
                  value={connectionString}
                  onChange={(e) => setConnectionString(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            <DrawerFooter>
              <Button
                type="submit"
                onClick={handleConnect}
                className="bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                Connect
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
