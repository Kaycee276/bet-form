import { LogOut, User, ChevronRight, Bell, Shield, FileText } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { BottomNav } from "../components/dashboard/BottomNav";
import { motion } from "framer-motion";

export const Settings = () => {
  const { user, signOut } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#07090e] flex flex-col relative pb-32 overflow-hidden text-slate-100">
      {/* Ambient background glass glow */}
      <div className="absolute top-0 right-1/3 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <header className="pt-12 pb-6 px-6 relative z-10 max-w-xl mx-auto w-full">
        <h2 className="text-2xl md:text-4xl font-heading font-black tracking-tight text-white mb-1">
          Settings & Profile
        </h2>
        <p className="text-slate-400 font-medium text-xs md:text-sm">
          Manage your tactical manager credentials and preferences.
        </p>
      </header>

      <main className="flex-1 px-6 relative z-10">
        <div className="max-w-xl mx-auto w-full space-y-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-[2.5rem] p-6 flex items-center gap-5 border border-white/15 shadow-2xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-emerald-500/30 flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
              {user?.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={28} className="text-emerald-400" />
              )}
            </div>
            
            <div className="flex-1 overflow-hidden">
              <p className="text-lg font-heading font-black text-white truncate">
                {user?.user_metadata?.full_name || "Head Manager"}
              </p>
              <p className="text-xs text-slate-400 font-medium truncate mt-0.5">{user?.email}</p>
            </div>
            
            <button className="w-9 h-9 rounded-full glass-panel border border-white/15 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
              <ChevronRight size={18} />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-[2.5rem] p-3 space-y-1 border border-white/15 shadow-xl"
          >
            <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl glass-pill text-emerald-400">
                  <Bell size={18} />
                </div>
                <span className="font-heading text-sm font-bold text-slate-200 group-hover:text-white">Push Notifications</span>
              </div>
              <div className="w-11 h-6 bg-emerald-500 rounded-full relative shadow-inner p-1">
                <div className="w-4 h-4 bg-slate-950 rounded-full shadow-md ml-auto"></div>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl glass-pill text-emerald-400">
                  <Shield size={18} />
                </div>
                <span className="font-heading text-sm font-bold text-slate-200 group-hover:text-white">Privacy Policy</span>
              </div>
              <ChevronRight size={16} className="text-slate-500 group-hover:text-slate-300" />
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl glass-pill text-emerald-400">
                  <FileText size={18} />
                </div>
                <span className="font-heading text-sm font-bold text-slate-200 group-hover:text-white">Terms of Service</span>
              </div>
              <ChevronRight size={16} className="text-slate-500 group-hover:text-slate-300" />
            </button>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 text-sm font-heading font-extrabold py-4 rounded-[2.5rem] border border-rose-500/30 transition-all cursor-pointer group shadow-lg"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Sign Out Session</span>
          </motion.button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
