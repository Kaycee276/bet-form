import { Trophy, Target, Zap } from "lucide-react";

const stats = [
  {
    title: "Global Rank",
    value: "#1,024",
    trend: "+12 spots",
    badgeColor: "text-[#ec48bd] bg-[#ec48bd]/15 border-[#ec48bd]/30",
    icon: Trophy,
    iconColor: "text-[#ec48bd]",
  },
  {
    title: "Total Points",
    value: "342.5",
    trend: "+45.0 this week",
    badgeColor: "text-[#5865f2] bg-[#5865f2]/15 border-[#5865f2]/30",
    icon: Zap,
    iconColor: "text-[#5865f2]",
  },
  {
    title: "Tactical Accuracy",
    value: "68.4%",
    trend: "+2.4% avg",
    badgeColor: "text-[#35ed7e] bg-[#35ed7e]/15 border-[#35ed7e]/30",
    icon: Target,
    iconColor: "text-[#35ed7e]",
  },
];

export const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="discord-card p-6 relative overflow-hidden group hover:border-[#5865f2]/50 transition-all"
          >
            <div className="flex justify-between items-start z-10 relative">
              <div>
                <p className="text-[#949ba4] text-xs font-black uppercase tracking-wider mb-2">{stat.title}</p>
                <h3 className="text-3xl font-heading font-black text-white mb-3 tracking-tight">{stat.value}</h3>
                <span className={`inline-flex items-center text-xs font-extrabold px-3 py-1 rounded-full border ${stat.badgeColor}`}>
                  {stat.trend}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Icon size={20} className={stat.iconColor} />
              </div>
            </div>
            
            {/* Ambient hover glow */}
            <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-[#5865f2]/15 blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>
          </div>
        );
      })}
    </div>
  );
};
