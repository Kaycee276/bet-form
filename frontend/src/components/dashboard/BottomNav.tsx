import { Link, useLocation } from "react-router-dom";
import { Calendar, Trophy, Settings } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { icon: Calendar, label: "Fixtures", path: "/dashboard" },
  { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 w-full h-16 bg-bg-dark/90 backdrop-blur-md border-t border-white/5 flex items-center justify-around px-4 z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.label}
            to={item.path}
            className={clsx(
              "flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors",
              isActive ? "text-primary" : "text-gray-500 hover:text-white"
            )}
          >
            <item.icon size={20} className={isActive ? "text-primary" : ""} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
