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
      <nav className="p-1.5 rounded-full flex items-center justify-between relative shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85)] border border-white/[0.09] bg-[#0c0e15]/90 backdrop-blur-2xl">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={clsx(
                "relative flex flex-col items-center justify-center w-full h-12 rounded-full transition-colors z-10",
                isActive ? "text-[#08090d] font-bold" : "text-slate-400 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full shadow-[0_2px_12px_rgba(255,255,255,0.15)]"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <div className="relative z-20 flex flex-col items-center gap-0.5">
                <item.icon 
                  size={17} 
                  className={isActive ? "text-[#08090d] stroke-[2.2]" : "text-slate-400 stroke-[1.8] group-hover:text-white"} 
                />
                <span className={clsx(
                  "text-[9px] font-mono tracking-wider uppercase",
                  isActive ? "text-[#08090d] font-bold" : "text-slate-400"
                )}>
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
