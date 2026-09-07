import { useAuthStore } from "../store/useAuthStore";
import { BottomNav } from "../components/dashboard/BottomNav";
import { motion } from "framer-motion";

export const Settings = () => {
  const { user, signOut } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col relative pb-32 overflow-hidden text-slate-100">
      {/* Brighter ambient glass glow */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[150px] pointer-events-none"></div>

      <header className="pt-12 pb-6 px-6 relative z-10 max-w-xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-white mb-1">
          Settings & Profile
        </h2>
        <p className="text-slate-300 font-medium text-xs md:text-sm">
          Manage your manager credentials and preferences.
        </p>
      </header>

      <main className="flex-1 px-6 relative z-10">
        <div className="max-w-xl mx-auto w-full space-y-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-none p-6 flex items-center gap-5 border border-white/20 shadow-2xl"
          >
            <div className="w-16 h-16 rounded-none bg-slate-800 border border-emerald-400/40 flex items-center justify-center overflow-hidden shrink-0 shadow-lg font-heading font-black text-emerald-300 text-xl">
              {user?.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user?.user_metadata?.full_name?.substring(0, 2).toUpperCase() || "MP"
              )}
            </div>
            
            <div className="flex-1 overflow-hidden">
              <p className="text-lg font-heading font-black text-white truncate">
                {user?.user_metadata?.full_name || "Head Manager"}
              </p>
              <p className="text-xs text-slate-300 font-medium truncate mt-0.5">{user?.email}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-none p-3 space-y-1 border border-white/20 shadow-xl"
          >
            <div className="w-full flex items-center justify-between p-4 rounded-none">
              <span className="font-heading text-sm font-bold text-slate-200">Push Notifications</span>
              <div className="w-11 h-6 bg-emerald-400 rounded-none relative shadow-inner p-1">
                <div className="w-4 h-4 bg-slate-900 rounded-none shadow-md ml-auto"></div>
              </div>
            </div>

            <button className="w-full flex items-center justify-between p-4 rounded-none hover:bg-white/10 transition-colors text-left">
              <span className="font-heading text-sm font-bold text-slate-200">Privacy Policy</span>
              <span className="text-xs text-slate-400 font-black">→</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-none hover:bg-white/10 transition-colors text-left">
              <span className="font-heading text-sm font-bold text-slate-200">Terms of Service</span>
              <span className="text-xs text-slate-400 font-black">→</span>
            </button>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-sm font-heading font-black py-4 rounded-none border border-rose-400/40 transition-all cursor-pointer shadow-lg"
          >
            <span>Sign Out Session</span>
          </motion.button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
