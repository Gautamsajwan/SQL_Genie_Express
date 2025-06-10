"use client";

import { Button } from "@/components/ui/button";
import { GridBackground } from "@/components/ui/grid-background";
import { Snowflake, SparkleIcon } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useState, useEffect, Suspense } from "react";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";

// Dynamically import components with no SSR
// const CopyBlock = dynamic(
//   () => import("react-code-blocks").then((mod) => ({ default: mod.CopyBlock })),
//   {
//     ssr: false,
//     loading: () => (
//       <div className="p-4 bg-gray-900 rounded-lg shadow-md">
//         <div className="text-gray-300">Loading code block...</div>
//       </div>
//     ),
//   }
// );

const TableMinimal = dynamic(() => import("../_components/table"), {
  ssr: false,
  loading: () => <div className="text-white">Loading table...</div>,
});

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [generatedQuery, setGeneratedQuery] = useState("");
  const [dataRows, setDataRows] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  // const [codeTheme, setCodeTheme] = useState<any>(null);
  const [hasConnectionDetails, setHasConnectionDetails] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if we have connection details
    const checkConnectionDetails = () => {
      try {
        const connectionDetailsRaw = localStorage.getItem("connectionDetails");
        setHasConnectionDetails(!!connectionDetailsRaw);
      } catch (error) {
        console.error("Error checking localStorage:", error);
        setHasConnectionDetails(false);
      }
    };

    checkConnectionDetails();

    // Load the theme on client side
    // import("react-code-blocks")
    //   .then((mod) => {
    //     setCodeTheme(mod.shadesOfPurple);
    //   })
    //   .catch((error) => {
    //     console.error("Error loading code theme:", error);
    //   });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const generateSqlQuery = async () => {
    // Early return if not on client side
    if (!isClient) {
      toast.error("Please wait for the page to load completely.");
      return;
    }

    setIsLoading(true);
    try {
      if (!inputValue.trim()) {
        toast.error("Empty input detected", {
          description: "Please provide an input before proceeding",
        });
        return;
      }

      // Check for localStorage availability
      let dbSchema = {};
      let connectionDetails = null;

      try {
        const dbSchemaRaw = localStorage.getItem("dbSchema");
        dbSchema = dbSchemaRaw ? JSON.parse(dbSchemaRaw) : {};
        
        const connectionDetailsRaw = localStorage.getItem("connectionDetails");
        if (!connectionDetailsRaw) {
          toast.error("No connection details found", {
            description: "Please set up your database connection first.",
          });
          return;
        }
        connectionDetails = JSON.parse(connectionDetailsRaw);
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        toast.error("Error accessing stored data", {
          description: "Please refresh the page and try again.",
        });
        return;
      }

      // Check if we have the required environment variable
      if (!process.env.NEXT_PUBLIC_SERVER_URL) {
        toast.error("Configuration error", {
          description: "Server URL is not configured.",
        });
        return;
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/generatesqlll`, {
        queryDescription: inputValue,
        schema: dbSchema,
      });

      const response2 = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/executeQuery`, {
        connectionString: connectionDetails.connectionString,
        schema: dbSchema,
        sqlQuery: response.data.query,
      });

      setDataRows(response2.data.data || []);
      setGeneratedQuery(response.data.query || "");
      
      toast.success("SQL query generated successfully!");
    } catch (error: any) {
      console.error("Error generating SQL query:", error);
      
      if (error.response && error.response.status === 400) {
        toast.error("Error generating SQL query", {
          description: error.response.data.customMessage || "Bad request",
        });
      } else if (error.code === 'ERR_NETWORK') {
        toast.error("Network error", {
          description: "Please check your internet connection and try again.",
        });
      } else {
        toast.error("Error generating SQL query", {
          description: error.message || "An unexpected error occurred",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="pt-16 flex w-full min-h-screen bg-black">
        <main className="flex-1 relative overflow-hidden">
          <GridBackground />
          <div className="relative h-full flex flex-col items-center justify-center px-4">
            <div className="text-white text-center">
              <Snowflake className="w-8 h-8 animate-spin mx-auto mb-4" />
              <p>Loading...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="pt-16 flex w-full min-h-screen bg-black">
      <main className="flex-1 relative overflow-hidden">
        <GridBackground />
        <div className="relative h-full flex flex-col items-center justify-center px-4">
          <div className="py-6 w-full max-w-4xl space-y-8">
            <h1 className="text-3xl font-semibold text-white text-center">
              Tell us what kind of SQL query to generate?
            </h1>

            {!hasConnectionDetails && (
              <div className="bg-yellow-900/50 border border-yellow-600 rounded-lg p-4 text-yellow-200">
                <p className="text-sm">
                  ⚠️ No database connection found. Please set up your database connection first.
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div className="relative p-3 bg-gray-900/50 rounded-lg">
                <Textarea
                  value={inputValue}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="e.g. Get all users with age greater than 25 and order by name"
                  className="w-full rounded-sm lg:text-base h-32 bg-gray-900 border-none text-white placeholder-gray-300 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  onClick={generateSqlQuery}
                  disabled={isLoading || !hasConnectionDetails}
                  className="bg-indigo-500 rounded-lg px-4 py-3 text-lg text-gray-100 hover:bg-green-500 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SparkleIcon className="w-6 h-6" />
                  <span>{isLoading ? "Generating..." : "Generate Query"}</span>
                </Button>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg">
              <div className="p-3 flex items-center justify-between">
                <h2 className="ml-2 text-lg font-semibold text-white">
                  {isLoading ? "Generating..." : "Generated SQL Query"}
                </h2>

                {isLoading ? (
                  <Snowflake className="text-green-400 w-9 h-9 animate-spin" />
                ) : (
                  <Snowflake className="text-blue-300 w-9 h-9" />
                )}
              </div>

              <div className="p-4 bg-gray-900 rounded-lg shadow-md">
                <Suspense fallback={<div className="text-gray-300">Loading code block...</div>}>
                  {/* <CopyBlock
                    text={generatedQuery || "Your SQL query will appear here..."}
                    language="sql"
                    showLineNumbers={true}
                    theme={codeTheme || {}}
                    codeBlock={true}
                    copied={false}
                  /> */}
                  <div>
                    {generatedQuery}
                  </div>
                </Suspense>
              </div>
            </div>

            <div>
              <Suspense fallback={<div className="text-white">Loading table...</div>}>
                <TableMinimal data={dataRows} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}