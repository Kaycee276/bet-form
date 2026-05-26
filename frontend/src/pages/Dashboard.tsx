import { useAuthStore } from '../store/useAuthStore';
import { LogOut, Trophy, Activity, Calendar } from 'lucide-react';

export const Dashboard = () => {
  const { user, signOut } = useAuthStore();

  return (
    <div className="min-h-screen bg-bg-dark text-white p-6">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-12 bg-bg-card p-4 rounded-2xl border border-primary/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center border-2 border-primary">
            {user?.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-bold text-primary">{user?.email?.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">Welcome, {user?.user_metadata?.full_name || user?.email}</h1>
            <p className="text-gray-400 text-sm">Dashboard Overview</p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Placeholder Stat Cards */}
        <div className="bg-bg-card p-6 rounded-2xl border border-primary/10 flex items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-xl text-primary">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Global Rank</p>
            <p className="text-2xl font-bold">#1,024</p>
          </div>
        </div>
        
        <div className="bg-bg-card p-6 rounded-2xl border border-primary/10 flex items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-xl text-primary">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Points</p>
            <p className="text-2xl font-bold">342</p>
          </div>
        </div>

        <div className="bg-bg-card p-6 rounded-2xl border border-primary/10 flex items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-xl text-primary">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Next Prediction</p>
            <p className="text-2xl font-bold">2 Days</p>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="col-span-1 md:col-span-3 bg-bg-card border border-primary/10 rounded-2xl p-8 min-h-[400px] mt-6 flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-2xl font-bold text-gray-300">Your Upcoming Fixtures</h2>
          <p className="text-gray-500 max-w-md">You haven't made any predictions yet. Check back when the tournament schedules are released!</p>
        </div>
      </main>
    </div>
  );
};
