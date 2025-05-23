import Image from "next/image";
import { Syne } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex lg:flex items-center gap-x-2 hover:opacity-75 transition">
        <div className="mr-10 shrink-0 lg:mr-0 lg:shrink">
          <Image src="/database.png" alt="SQL-Genie" width="40" height="40" />
        </div>
        <div className={cn('hidden lg:block', syne.className)}>
          <p className="text-md font-extrabold text-indigo-100">SQL-Genie</p>
          <p className="text-sm font-bold text-indigo-100">powered by AI</p>
        </div>
      </div>
    </Link>
  );
};

export default Logo