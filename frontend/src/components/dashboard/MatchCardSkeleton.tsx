export const MatchCardSkeleton = () => {
  return (
    <div className="glass-panel rounded-3xl p-5 relative overflow-hidden">
      <div className="animate-pulse flex flex-col h-full">
        <div className="flex justify-between items-center mb-5">
          {/* Status Badge Skeleton */}
          <div className="w-20 h-6 bg-white/10 rounded-full" />
          {/* Time Skeleton */}
          <div className="w-16 h-4 bg-white/10 rounded" />
        </div>

        <div className="flex items-center justify-between mb-6">
          {/* Home Team Skeleton */}
          <div className="flex flex-col items-center gap-3 flex-1">
            <div className="w-14 h-14 rounded-full bg-white/10" />
            <div className="w-16 h-4 bg-white/10 rounded" />
          </div>

          {/* VS Badge Skeleton */}
          <div className="flex flex-col items-center px-4">
            <div className="w-8 h-8 rounded-full bg-white/10" />
          </div>

          {/* Away Team Skeleton */}
          <div className="flex flex-col items-center gap-3 flex-1">
            <div className="w-14 h-14 rounded-full bg-white/10" />
            <div className="w-16 h-4 bg-white/10 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};
