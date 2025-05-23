import { GridBackground } from "@/components/ui/grid-background";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <GridBackground />
      {children}
    </main>
  );
};

export default AuthLayout;
