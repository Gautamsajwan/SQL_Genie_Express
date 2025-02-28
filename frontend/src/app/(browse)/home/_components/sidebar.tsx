import {
  BadgePlus,
  Clipboard,
  Database,
  Globe,
  HelpCircle,
  Search,
  Settings,
  User,
} from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 p-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <SidebarItem icon={<Database size={20} />} text="DB Schema Viewer" />
          <SidebarItem icon={<BadgePlus size={20} />} text="Query Generator" />
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  text,
  active = false,
}: {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
        active
          ? "bg-gray-800 text-white"
          : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
