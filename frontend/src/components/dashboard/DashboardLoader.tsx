import { MatchCardSkeleton } from "./MatchCardSkeleton";

export const DashboardLoader = () => {
  return (
    <div className="flex flex-col gap-10 w-full animate-pulse">
      {/* Mock League Group 1 */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <div className="w-48 h-6 bg-white/10 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <MatchCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Mock League Group 2 */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <div className="w-32 h-6 bg-white/10 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <MatchCardSkeleton key={i + 3} />
          ))}
        </div>
      </div>
    </div>
  );
};
