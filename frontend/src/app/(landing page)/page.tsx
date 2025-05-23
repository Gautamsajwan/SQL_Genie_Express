"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black/90 overflow-hidden">
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="w-full absolute inset-0 h-screen">
        </div>
        <div className="relative flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-7xl font-bold text-center text-white relative z-20">
            Bridge the Gap Between
            <br /> Logic and Sql Queries
          </h1>
          <p className="mt-4 text-white/80 text-base md:text-xl max-w-lg mx-auto relative z-20">
            Effortlessly generate SQL queries with plain English and let the AI handle the rest
          </p>
          <div className="mt-8 relative z-20">
            <Button asChild={true} className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-6 text-lg font-medium transition-all hover:opacity-90">
              <Link href="/home">Enter Application</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
