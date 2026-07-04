import { Trophy, Activity, Target } from "lucide-react";

const stats = [
  {
    title: "Global Rank",
    value: "#1,024",
    trend: "+12 positions",
    icon: Trophy,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    title: "Total Points",
    value: "342",
    trend: "+45 this week",
    icon: Activity,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Accuracy",
    value: "68%",
    trend: "+2.4%",
    icon: Target,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
];

export const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:bg-white/10 transition-colors"
        >
          <div className="flex justify-between items-start z-10 relative">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">{stat.title}</p>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-sm text-green-400 font-medium">{stat.trend}</p>
            </div>
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
          </div>
          
          {/* Subtle gradient background decoration */}
          <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full ${stat.bg} blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
        </div>
      ))}
    </div>
  );
};
