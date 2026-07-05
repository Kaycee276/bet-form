import { Link, useLocation } from "react-router-dom";
import { Calendar, Trophy, Settings } from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";

const navItems = [
  { icon: Calendar, label: "Fixtures", path: "/dashboard" },
  { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 z-50">
      <nav className="glass-panel rounded-full p-2 flex items-center justify-between relative shadow-2xl shadow-black/50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={clsx(
                "relative flex flex-col items-center justify-center w-full h-14 rounded-full transition-colors z-10",
                isActive ? "text-bg-base font-bold" : "text-slate-400 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div className="relative z-20 flex flex-col items-center gap-1">
                <item.icon size={20} className={isActive ? "text-bg-base" : ""} />
                <span className="text-[10px] font-heading tracking-wide">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
