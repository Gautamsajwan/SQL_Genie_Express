import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

type Props = {};

async function Actions({}: Props) {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!user && (
        <SignInButton>
          <Button className="cursor-pointer bg-blue-500">Login</Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "w-8 h-8 outline outline-[3px] outline-gray-300"
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Actions;
