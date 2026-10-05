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
      <nav className="discord-nav p-1.5 flex items-center justify-between relative shadow-[0_16px_45px_rgba(0,0,0,0.6)] border border-white/15 bg-[#101344]/90 backdrop-blur-2xl">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={clsx(
                "relative flex flex-col items-center justify-center w-full h-13 rounded-full transition-colors z-10",
                isActive ? "text-white font-extrabold" : "text-[#949ba4] hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#5865f2] rounded-full shadow-[0_0_25px_rgba(88,101,242,0.6)]"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <div className="relative z-20 flex flex-col items-center gap-0.5">
                <item.icon size={19} className={isActive ? "text-white stroke-[2.5]" : "stroke-[1.9]"} />
                <span className="text-[10px] font-heading font-black tracking-wider uppercase">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
