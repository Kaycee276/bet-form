import { LogOut, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { BottomNav } from "../components/dashboard/BottomNav";

export const Settings = () => {
  const { user, signOut } = useAuthStore();

  return (
    <div className="min-h-screen bg-bg-dark flex flex-col pb-16">
      <main className="flex-1 p-8">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Settings</h2>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden">
                {user?.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={32} className="text-primary" />
                )}
              </div>
              <div>
                <p className="text-lg font-bold text-white">{user?.user_metadata?.full_name || "User"}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>

          <button
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 font-bold py-4 rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-colors cursor-pointer"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
