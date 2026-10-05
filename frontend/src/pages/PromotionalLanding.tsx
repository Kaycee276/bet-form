import { ArrowRight, Trophy, Coins, ShieldCheck, Sparkles } from "lucide-react";
import { useModalStore } from "../store/useModalStore";
import { motion, type Variants } from "framer-motion";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const PromotionalLanding = () => {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className="min-h-screen bg-[#0a0d3a] overflow-hidden relative text-white">
      {/* Discord-inspired ambient glows: Blurple, Magenta, Electric Green */}
      <div className="absolute top-0 left-1/4 w-[650px] h-[650px] bg-[#5865f2]/20 rounded-full blur-[140px] pointer-events-none -translate-y-1/3"></div>
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-[#ec48bd]/15 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-20 left-1/3 w-[700px] h-[700px] bg-[#35ed7e]/12 rounded-full blur-[180px] pointer-events-none"></div>

      {/* Discord-style Header */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-6xl px-6 z-50">
        <div className="discord-nav h-16 px-6 flex items-center justify-between shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3 font-heading font-black text-xl tracking-tight">
            <img 
              src="/logo.png" 
              alt="BetForm Logo" 
              className="w-8 h-8 rounded-xl border border-white/20 shadow-[0_0_15px_rgba(88,101,242,0.4)] object-cover" 
            />
            <div className="flex items-center gap-1.5">
              <span className="text-white font-extrabold tracking-tight">Bet</span>
              <span className="text-[#5865f2] font-black drop-shadow-[0_0_12px_rgba(88,101,242,0.6)]">Form</span>
              <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#35ed7e]/20 text-[#35ed7e] border border-[#35ed7e]/40">
                STELLAR
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={openModal}
              className="px-6 py-2 discord-button-blurple text-sm font-extrabold cursor-pointer"
            >
              Play Now
            </button>
          </div>
        </div>
      </header>

      <main className="pt-36 pb-24 max-w-6xl mx-auto px-6 space-y-36 relative z-10">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center space-y-8 mt-10 md:mt-16"
        >
          <motion.div 
            variants={fadeIn} 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full discord-pill text-xs font-black uppercase tracking-wider mb-2 border border-[#5865f2]/40 bg-[#5865f2]/15"
          >
            <span className="w-2 h-2 rounded-full bg-[#35ed7e] animate-pulse" />
            Tactical Football Prediction & USDC Pools
          </motion.div>

          <motion.h1
            variants={fadeIn}
            className="text-4xl sm:text-6xl md:text-7xl font-heading font-black leading-[1.05] tracking-tight text-white drop-shadow-md"
          >
            PROVE YOUR <br />
            <span className="bg-gradient-to-r from-[#5865f2] via-[#00b0f4] to-[#35ed7e] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(88,101,242,0.45)]">
              TACTICAL GENIUS
            </span>
          </motion.h1>
          
          <motion.p
            variants={fadeIn}
            className="text-lg sm:text-xl text-[#949ba4] max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Predict match formations and starting XIs. Compete on a global skill leaderboard or stake in decentralized USDC contest pools powered by <span className="text-white font-bold">Stellar Soroban</span>.
          </motion.p>
          
          <motion.div
            variants={fadeIn}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <button
              onClick={openModal}
              className="group flex items-center gap-3 px-8 py-3.5 discord-button-blurple text-base font-black cursor-pointer"
            >
              Start Predicting
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={openModal}
              className="flex items-center gap-2 px-7 py-3.5 discord-button-secondary text-sm font-bold cursor-pointer"
            >
              <Coins size={16} className="text-[#35ed7e]" />
              USDC Contest Pools
            </button>
          </motion.div>

          {/* Quick Stat Badges */}
          <motion.div 
            variants={fadeIn}
            className="pt-8 flex flex-wrap justify-center items-center gap-4 text-xs font-bold text-[#949ba4]"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#1e2353]/80 border border-white/10">
              <Sparkles size={14} className="text-[#ec48bd]" />
              <span>15 Tactical Formations</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#1e2353]/80 border border-white/10">
              <Trophy size={14} className="text-[#35ed7e]" />
              <span>Odds-Weighted Scoring</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#1e2353]/80 border border-white/10">
              <ShieldCheck size={14} className="text-[#5865f2]" />
              <span>Non-Custodial Soroban Escrow</span>
            </div>
          </motion.div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-16"
        >
          <div className="text-center space-y-4">
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-5xl font-heading font-black text-white tracking-tight"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-[#949ba4] text-base max-w-2xl mx-auto font-medium"
            >
              Three straightforward steps to test your tactical foresight against managers worldwide.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                badge: "FIXTURES",
                badgeColor: "text-[#35ed7e] bg-[#35ed7e]/15 border-[#35ed7e]/30",
                title: "Pick a Match",
                desc: "Browse upcoming fixtures across top leagues. Submit your tactical lineup before kickoff lockdown.",
              },
              {
                num: "02",
                badge: "FORMATION",
                badgeColor: "text-[#5865f2] bg-[#5865f2]/15 border-[#5865f2]/30",
                title: "Choose Formation",
                desc: "Select from 15 distinct formations. High-risk setups like 3-3-3-1 award higher multipliers than a 4-3-3.",
              },
              {
                num: "03",
                badge: "STARTING XI",
                badgeColor: "text-[#ec48bd] bg-[#ec48bd]/15 border-[#ec48bd]/30",
                title: "Draft the 11",
                desc: "Select the starting XI into each tactical slot. De-duplicate players and lock in on-chain or free play.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -6 }}
                className="discord-card p-8 group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-heading font-black text-white tracking-tight">
                    {step.num}
                  </span>
                  <span className={`text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${step.badgeColor}`}>
                    {step.badge}
                  </span>
                </div>
                <h3 className="text-xl font-heading font-extrabold mb-3 text-white">
                  {step.title}
                </h3>
                <p className="text-[#949ba4] text-sm leading-relaxed font-normal">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Scoring System Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="discord-panel p-8 md:p-14 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#5865f2]/15 rounded-full blur-[140px] pointer-events-none"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#35ed7e] uppercase tracking-wider">
                  <Sparkles size={14} />
                  <span>Fair & Skill-Based</span>
                </div>
                <motion.h2
                  variants={fadeIn}
                  className="text-3xl md:text-4xl font-heading font-black text-white tracking-tight"
                >
                  Odds-Weighted Scoring Engine
                </motion.h2>
                <motion.p
                  variants={fadeIn}
                  className="text-base text-[#949ba4] font-medium leading-relaxed"
                >
                  Predictions are scored on tactical difficulty and position proximity — rewarding accurate, bold insight over obvious chalk.
                </motion.p>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    title: "Formation Multipliers (up to 4.0×)",
                    desc: "Correct tactical shape pays out instantly according to rare formation odds.",
                    border: "border-[#5865f2]",
                  },
                  {
                    title: "Proximity Scoring (Exact, Adjacent, Tier)",
                    desc: "Earn partial credit when players start in neighboring tactical positions (e.g. RW vs RM).",
                    border: "border-[#35ed7e]",
                  },
                  {
                    title: "On-Chain Soroban Settlement",
                    desc: "Contest pools automatically distribute escrowed USDC prizes to verified winners.",
                    border: "border-[#ec48bd]",
                  },
                ].map((item, i) => (
                  <motion.div
                    variants={fadeIn}
                    key={i}
                    className={`border-l-3 ${item.border} pl-4 py-1.5`}
                  >
                    <h4 className="text-white font-heading text-base font-bold mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[#949ba4] text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              variants={fadeIn}
              className="discord-card p-8 relative shadow-2xl overflow-hidden border border-white/15 bg-[#181b3d]/90"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <span className="text-xs font-black uppercase tracking-wider text-[#949ba4]">Scoring Example</span>
                <span className="text-xs font-bold text-[#35ed7e] bg-[#35ed7e]/15 px-2.5 py-0.5 rounded-full border border-[#35ed7e]/30">4-2-3-1 MATCH</span>
              </div>
              
              <div className="space-y-4 text-sm font-semibold">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-white">Formation (4-2-3-1) Exact</span>
                  <span className="text-[#35ed7e] font-extrabold">+3.0 pts</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-white">Starter Match (10 × 2.5 ST)</span>
                  <span className="text-[#5865f2] font-extrabold">+25.0 pts</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-white">Adjacent Position (RW as RM)</span>
                  <span className="text-[#00b0f4] font-extrabold">+12.0 pts</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-white font-heading font-black text-lg">Total Points</span>
                  <span className="text-3xl font-heading font-black text-white drop-shadow-[0_0_20px_rgba(88,101,242,0.6)]">
                    40.0 <span className="text-xs font-bold text-[#949ba4]">PTS</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <footer className="mt-24 border-t border-white/10 bg-[#070928] text-center text-[#949ba4] py-12">
        <p className="font-heading text-xs font-medium">
          &copy; {new Date().getFullYear()} BetForm. Built on Stellar Soroban. Not affiliated with FIFA, UEFA, or official football bodies.
        </p>
      </footer>
    </div>
  );
};
