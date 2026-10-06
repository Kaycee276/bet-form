export const MatchCardSkeleton = () => {
  return (
    <div className="p-1 rounded-[1.5rem] bg-white/[0.03] border border-white/[0.08] relative overflow-hidden">
      <div className="p-5 rounded-[calc(1.5rem-4px)] bg-[#0f121a] animate-pulse flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <div className="w-20 h-5 bg-white/[0.07] rounded-full" />
          <div className="w-24 h-5 bg-white/[0.07] rounded-full" />
        </div>

        <div className="flex items-center justify-between my-2">
          <div className="flex flex-col items-center gap-2.5 flex-1">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.07]" />
            <div className="w-20 h-3.5 bg-white/[0.07] rounded-full" />
          </div>

          <div className="flex flex-col items-center px-2">
            <div className="w-7 h-7 rounded-full bg-white/[0.07]" />
          </div>

          <div className="flex flex-col items-center gap-2.5 flex-1">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.07]" />
            <div className="w-20 h-3.5 bg-white/[0.07] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
