"use client";

import { Cog } from "lucide-react";
import React from "react";

type Props = {};

function CustomSpinner({}: Props) {
  return (
    <div className="fixed w-screen h-screen top-0 left-0 right-0 bottom-0 flex items-center justify-center backdrop-blur-lg z-[9999]">
      <div className="p-6 aspect-square bg-[#222731]/60 rounded-lg flex flex-col items-center justify-center">
        <Cog className="w-14 h-14 text-indigo-200 animate-spin" />
      </div>
    </div>
  );
}

export default CustomSpinner;
