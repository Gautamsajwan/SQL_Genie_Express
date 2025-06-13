import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import { AlertCircle, Info } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SQL-Genie",
  description: "A full fledged database interaction service provider sass",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [dark],
      }}
    >
      <html lang="en">
        <body className={poppins.className}>
          <Toaster
            theme="dark"
            position="bottom-right"
            icons={{
              info: <Info className="text-blue-400" />,
              error: <AlertCircle className="text-red-400" />,
            }}
          />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
