import { Trophy, Target, Zap } from "lucide-react";

const stats = [
  {
    title: "Global Rank",
    value: "#1,024",
    trend: "+12 spots",
    badgeColor: "text-amber-400 bg-amber-400/10 border-amber-400/25",
    icon: Trophy,
    iconColor: "text-amber-400",
  },
  {
    title: "Total Points",
    value: "342.5",
    trend: "+45.0 this week",
    badgeColor: "text-[#00e599] bg-[#00e599]/10 border-[#00e599]/25",
    icon: Zap,
    iconColor: "text-[#00e599]",
  },
  {
    title: "Tactical Accuracy",
    value: "68.4%",
    trend: "+2.4% avg",
    badgeColor: "text-sky-400 bg-sky-400/10 border-sky-400/25",
    icon: Target,
    iconColor: "text-sky-400",
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
            className="p-1 rounded-[1.5rem] bg-white/[0.03] border border-white/[0.08] group hover:border-white/[0.14] transition-all"
          >
            <div className="h-full p-6 rounded-[calc(1.5rem-4px)] bg-[#0f121a] flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-[11px] font-mono uppercase tracking-[0.15em] mb-2 font-medium">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-mono font-bold text-white mb-3 tracking-tight tabular-nums">
                    {stat.value}
                  </h3>
                  <span className={`inline-flex items-center text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full border ${stat.badgeColor}`}>
                    {stat.trend}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                  <Icon size={18} className={stat.iconColor} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
