"use client";

import { Button } from "@/components/ui/button";
import { GridBackground } from "@/components/ui/grid-background";
import { Snowflake, SparkleIcon } from "lucide-react";
import { toast } from "sonner"; 

import axios from "axios";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import { CopyBlock, shadesOfPurple } from "react-code-blocks";
import TableMinimal from "../_components/table";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [generatedQuery, setGeneratedQuery] = useState("");
  const [dataRows, setDataRows] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  // flask model api
  // const generateSqlQueryy = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/generatesql`, {
  //       text: inputValue,
  //     });

  //     if (response.status !== 200) {
  //       console.error("Failed to generate SQL query");
  //       return;
  //     }

  //     setGeneratedQuery(response.data.sql_query);
  //   } catch (error) {
  //     console.error("Error generating SQL query:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // gemini ;-
  const generateSqlQuery = async () => {
    setIsLoading(true);
    try {
      if (!inputValue) {
        return toast.error("Empty input detected", {
          description: "Please provide an input before proceeding",
        });
      }

      const dbSchema =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("dbSchema") || "{}")
          : {};

      const connectionDetails =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("connectionDetails") || "{}")
          : {};

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/generatesqlll`,
        {
          queryDescription: inputValue,
          schema: dbSchema,
        }
      );

      const response2 = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/executeQuery`,
        {
          connectionString: connectionDetails.connectionString,
          schema: dbSchema,
          sqlQuery: response.data.query,
        }
      );

      setDataRows(response2.data.data);
      setGeneratedQuery(response.data.query);
    } catch (error: any) {
      toast.error("Error generating SQL query", {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-16 flex w-full min-h-screen bg-black">
      <main className="flex-1 relative overflow-hidden">
        <GridBackground />
        <div className="relative h-full flex flex-col items-center justify-center px-4">
          <div className="py-6 w-full max-w-4xl space-y-8">
            <h1 className="text-3xl font-semibold text-white text-center">
              Tell us what kind of SQL query to generate?
            </h1>

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
                  className="bg-indigo-500 rounded-lg px-4 py-3 text-lg text-gray-100 hover:bg-green-500 transition-all duration-200 cursor-pointer"
                >
                  <SparkleIcon className="w-6 h-6" />
                  <span>Generate Query</span>
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
                <CopyBlock
                  text={generatedQuery || "Your SQL query will appear here..."}
                  language={"sql"}
                  showLineNumbers={true}
                  theme={shadesOfPurple}
                  codeBlock={true}
                  copied={false}
                />
              </div>
            </div>

            <div>
              <TableMinimal data={dataRows} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
