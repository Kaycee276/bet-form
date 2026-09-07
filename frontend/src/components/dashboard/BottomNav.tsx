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
      <nav className="glass-nav rounded-full p-2 flex items-center justify-between relative shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/20">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={clsx(
                "relative flex flex-col items-center justify-center w-full h-14 rounded-full transition-colors z-10",
                isActive ? "text-slate-950 font-bold" : "text-slate-300 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full shadow-[0_0_25px_rgba(52,211,153,0.6)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div className="relative z-20 flex flex-col items-center gap-1">
                <item.icon size={20} className={isActive ? "text-slate-950 stroke-[2.5]" : "stroke-[1.8]"} />
                <span className="text-[10px] font-heading font-black tracking-wider uppercase">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
