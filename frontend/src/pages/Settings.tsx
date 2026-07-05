import { LogOut, User, ChevronRight } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { BottomNav } from "../components/dashboard/BottomNav";
import { motion } from "framer-motion";

export const Settings = () => {
  const { user, signOut } = useAuthStore();

  return (
    <div className="min-h-screen bg-bg-base flex flex-col relative pb-32">

      <header className="pt-12 pb-6 px-6 relative z-10 max-w-xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-heading font-black tracking-tight text-white mb-2">Settings</h2>
        <p className="text-slate-400 font-medium text-xs">Manage your manager profile.</p>
      </header>

      <main className="flex-1 px-6 relative z-10">
        <div className="max-w-xl mx-auto w-full space-y-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-[2rem] p-6 flex items-center gap-5"
          >
            <div className="w-14 h-14 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
              {user?.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={24} className="text-slate-400" />
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-lg font-heading font-bold text-white truncate">{user?.user_metadata?.full_name || "Manager Profile"}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
            <button className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
              <ChevronRight size={18} />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel rounded-[2rem] p-2 space-y-1"
          >
            <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors group">
              <span className="font-heading text-sm font-semibold text-slate-300 group-hover:text-white">Push Notifications</span>
              <div className="w-10 h-5 bg-primary rounded-full relative shadow-inner">
                <div className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors group">
              <span className="font-heading text-sm font-semibold text-slate-300 group-hover:text-white">Privacy Policy</span>
              <ChevronRight size={16} className="text-slate-500 group-hover:text-slate-300" />
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors group">
              <span className="font-heading text-sm font-semibold text-slate-300 group-hover:text-white">Terms of Service</span>
              <ChevronRight size={16} className="text-slate-500 group-hover:text-slate-300" />
            </button>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 text-sm font-heading font-bold py-4 rounded-[2rem] border border-red-500/20 hover:bg-red-500/20 transition-colors cursor-pointer group"
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
