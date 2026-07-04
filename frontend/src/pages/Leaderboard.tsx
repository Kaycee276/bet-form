import { BottomNav } from "../components/dashboard/BottomNav";

export const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-bg-dark flex flex-col pb-16">
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Leaderboard</h2>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center min-h-[400px]">
            <h3 className="text-xl font-bold text-gray-300">Coming Soon</h3>
            <p className="text-gray-500 max-w-md">The leaderboard is currently being updated. Check back later to see where you rank!</p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
