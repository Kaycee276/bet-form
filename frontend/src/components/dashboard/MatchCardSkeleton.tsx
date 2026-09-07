export const MatchCardSkeleton = () => {
  return (
    <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
      <div className="animate-pulse flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <div className="w-20 h-6 bg-white/10 rounded-full" />
          <div className="w-24 h-5 bg-white/10 rounded-full" />
        </div>

        <div className="flex items-center justify-between my-2">
          <div className="flex flex-col items-center gap-3 flex-1">
            <div className="w-16 h-16 rounded-2xl bg-white/10" />
            <div className="w-20 h-4 bg-white/10 rounded" />
          </div>

          <div className="flex flex-col items-center px-4">
            <div className="w-9 h-9 rounded-full bg-white/10" />
          </div>

          <div className="flex flex-col items-center gap-3 flex-1">
            <div className="w-16 h-16 rounded-2xl bg-white/10" />
            <div className="w-20 h-4 bg-white/10 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};
