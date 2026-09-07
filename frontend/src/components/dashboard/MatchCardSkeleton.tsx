export const MatchCardSkeleton = () => {
  return (
    <div className="glass-card rounded-none p-6 relative overflow-hidden">
      <div className="animate-pulse flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <div className="w-20 h-6 bg-white/10 rounded-none" />
          <div className="w-24 h-5 bg-white/10 rounded-none" />
        </div>

        <div className="flex items-center justify-between my-2">
          <div className="flex flex-col items-center gap-3 flex-1">
            <div className="w-16 h-16 rounded-none bg-white/10" />
            <div className="w-20 h-4 bg-white/10 rounded-none" />
          </div>

          <div className="flex flex-col items-center px-4">
            <div className="w-9 h-9 rounded-none bg-white/10" />
          </div>

          <div className="flex flex-col items-center gap-3 flex-1">
            <div className="w-16 h-16 rounded-none bg-white/10" />
            <div className="w-20 h-4 bg-white/10 rounded-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
