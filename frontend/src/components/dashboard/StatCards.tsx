const stats = [
  {
    title: "Global Rank",
    value: "#1,024",
    trend: "+12 positions",
    badgeColor: "text-amber-300 bg-amber-400/20 border-amber-400/40",
  },
  {
    title: "Total Points",
    value: "342",
    trend: "+45 this week",
    badgeColor: "text-emerald-300 bg-emerald-400/20 border-emerald-400/40",
  },
  {
    title: "Accuracy",
    value: "68%",
    trend: "+2.4%",
    badgeColor: "text-cyan-300 bg-cyan-400/20 border-cyan-400/40",
  },
];

export const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="glass-card rounded-3xl p-6 relative overflow-hidden group hover:border-emerald-400/50 transition-all border border-white/20"
        >
          <div className="flex justify-between items-start z-10 relative">
            <div>
              <p className="text-slate-300 text-xs font-black uppercase tracking-wider mb-1.5">{stat.title}</p>
              <h3 className="text-3xl font-heading font-black text-white mb-2">{stat.value}</h3>
              <span className={`inline-block text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${stat.badgeColor}`}>
                {stat.trend}
              </span>
            </div>
          </div>
          
          {/* Subtle ambient glass glow */}
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-emerald-400/15 blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>
        </div>
      ))}
    </div>
  );
};
