import { Trophy, Activity, Target } from "lucide-react";

const stats = [
  {
    title: "Global Rank",
    value: "#1,024",
    trend: "+12 positions",
    icon: Trophy,
    color: "text-amber-400",
    bg: "bg-amber-400/15 border-amber-400/30",
  },
  {
    title: "Total Points",
    value: "342",
    trend: "+45 this week",
    icon: Activity,
    color: "text-emerald-400",
    bg: "bg-emerald-400/15 border-emerald-400/30",
  },
  {
    title: "Accuracy",
    value: "68%",
    trend: "+2.4%",
    icon: Target,
    color: "text-cyan-400",
    bg: "bg-cyan-400/15 border-cyan-400/30",
  },
];

export const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="glass-card rounded-3xl p-6 relative overflow-hidden group hover:border-emerald-500/40 transition-colors"
        >
          <div className="flex justify-between items-start z-10 relative">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{stat.title}</p>
              <h3 className="text-3xl font-heading font-black text-white mb-2">{stat.value}</h3>
              <p className="text-xs text-emerald-400 font-bold">{stat.trend}</p>
            </div>
            
            <div className={`p-3.5 rounded-2xl border ${stat.bg} ${stat.color} shadow-lg`}>
              <stat.icon size={22} />
            </div>
          </div>
          
          {/* Subtle glass orb ambient glow */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-emerald-500/10 blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>
        </div>
      ))}
    </div>
  );
};
