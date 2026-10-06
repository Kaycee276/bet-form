import { ArrowRight, Trophy, Coins, ShieldCheck, Sparkles } from "lucide-react";
import { useModalStore } from "../store/useModalStore";
import { motion, type Variants } from "framer-motion";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const PromotionalLanding = () => {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className="min-h-screen bg-[#08090d] overflow-hidden relative text-slate-100 selection:bg-[#00e599]/30 selection:text-white">
      {/* Restrained architectural spotlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#00e599]/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-[-100px] w-[500px] h-[500px] bg-slate-800/20 rounded-full blur-[160px] pointer-events-none" />

      {/* Floating Island Header */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 z-50">
        <div className="h-14 px-5 rounded-full bg-[#0d1017]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.8)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="BetForm Logo" 
              className="w-7 h-7 rounded-lg border border-white/10 object-cover" 
            />
            <div className="flex items-center gap-2">
              <span className="text-white font-bold tracking-tight text-base">BetForm</span>
              <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-300 border border-white/10">
                SOROBAN
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={openModal}
              className="px-5 py-2 rounded-full bg-white text-[#08090d] text-xs font-bold tracking-wide hover:bg-slate-200 transition-all active:scale-[0.98] cursor-pointer"
            >
              Launch App
            </button>
          </div>
        </div>
      </header>

      <main className="pt-36 pb-28 max-w-5xl mx-auto px-6 space-y-32 relative z-10">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center space-y-7 mt-8 md:mt-14"
        >
          <motion.div 
            variants={fadeIn} 
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] text-[#00e599] bg-[#00e599]/10 border border-[#00e599]/25 shadow-[0_0_16px_rgba(0,229,153,0.08)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e599] animate-pulse" />
            Tactical Football Prediction & On-Chain Pools
          </motion.div>

          <motion.h1
            variants={fadeIn}
            className="text-4xl sm:text-6xl md:text-7xl font-heading font-black leading-[1.08] tracking-tight text-white max-w-4xl mx-auto"
          >
            PROVE YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400">
              TACTICAL FORESIGHT
            </span>
          </motion.h1>
          
          <motion.p
            variants={fadeIn}
            className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto font-normal leading-relaxed"
          >
            Predict match formations and starting XIs. Compete on global skill leaderboards or stake in decentralized USDC contest pools powered by <span className="text-slate-200 font-medium">Stellar Soroban</span>.
          </motion.p>
          
          {/* Nested Button-in-Button CTA Architecture */}
          <motion.div
            variants={fadeIn}
            className="flex flex-wrap justify-center items-center gap-4 pt-3"
          >
            <button
              onClick={openModal}
              className="group pl-6 pr-2 py-2 rounded-full bg-[#00e599] text-[#04120b] text-sm font-bold tracking-tight hover:bg-[#05f0a2] active:scale-[0.98] transition-all flex items-center gap-3 shadow-[0_8px_24px_-4px_rgba(0,229,153,0.35)] cursor-pointer"
            >
              <span>Start Predicting</span>
              <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight size={15} className="text-[#04120b]" />
              </div>
            </button>

            <button
              onClick={openModal}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 text-sm font-medium transition-all active:scale-[0.98] cursor-pointer"
            >
              <Coins size={16} className="text-[#00e599]" />
              <span>USDC Contest Pools</span>
            </button>
          </motion.div>

          {/* Quick Stat Badges */}
          <motion.div 
            variants={fadeIn}
            className="pt-6 flex flex-wrap justify-center items-center gap-3 text-xs font-medium text-slate-400"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#11141d] border border-white/[0.07]">
              <Sparkles size={14} className="text-[#00e599]" />
              <span>15 Tactical Formations</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#11141d] border border-white/[0.07]">
              <Trophy size={14} className="text-amber-400" />
              <span>Odds-Weighted Scoring</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#11141d] border border-white/[0.07]">
              <ShieldCheck size={14} className="text-sky-400" />
              <span>Non-Custodial Soroban Escrow</span>
            </div>
          </motion.div>
        </motion.section>

        {/* How It Works Section - Double-Bezel Hardware Architecture */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="space-y-12"
        >
          <div className="text-center space-y-3">
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-4xl font-heading font-black text-white tracking-tight"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-normal"
            >
              Three straightforward steps to challenge managers worldwide and claim victory.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                num: "01",
                badge: "FIXTURES",
                title: "Pick a Match",
                desc: "Browse upcoming fixtures across top leagues. Submit your tactical lineup before kickoff lockdown.",
              },
              {
                num: "02",
                badge: "FORMATION",
                title: "Choose Formation",
                desc: "Select from 15 distinct setups. High-risk structures like 3-3-3-1 award higher multipliers than a 4-3-3.",
              },
              {
                num: "03",
                badge: "STARTING XI",
                title: "Draft the 11",
                desc: "Slot players into tactical positions. Lock in free predictions or stake in on-chain USDC prize pools.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -4 }}
                className="p-1 rounded-[1.75rem] bg-white/[0.03] border border-white/[0.08] group transition-colors hover:border-white/[0.14]"
              >
                <div className="h-full p-7 rounded-[calc(1.75rem-4px)] bg-[#0f121a] flex flex-col justify-between space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-mono font-bold text-slate-500 tabular-nums">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full bg-white/[0.05] text-[#00e599] border border-[#00e599]/20">
                      {step.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Scoring System Section - Machined Hardware Panel */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="p-1 rounded-[2rem] bg-white/[0.03] border border-white/[0.08] relative overflow-hidden"
        >
          <div className="p-8 md:p-12 rounded-[calc(2rem-4px)] bg-[#0e1118] relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#00e599] tracking-wider uppercase">
                  <Sparkles size={13} />
                  <span>Fair & Skill-Weighted</span>
                </div>
                <motion.h2
                  variants={fadeIn}
                  className="text-2xl md:text-3xl font-heading font-black text-white tracking-tight"
                >
                  Odds-Weighted Scoring Engine
                </motion.h2>
                <motion.p
                  variants={fadeIn}
                  className="text-sm text-slate-400 font-normal leading-relaxed"
                >
                  Predictions are calculated on tactical difficulty and position proximity — rewarding accurate, non-obvious insight over generic chalk.
                </motion.p>
              </div>
              
              <div className="space-y-3.5">
                {[
                  {
                    title: "Formation Multipliers (up to 4.0×)",
                    desc: "Correct tactical shape pays out according to real formation rarity.",
                  },
                  {
                    title: "Proximity Scoring (Exact, Adjacent, Tier)",
                    desc: "Earn partial credit when players start in neighboring tactical positions (e.g. RW as RM).",
                  },
                  {
                    title: "On-Chain Soroban Settlement",
                    desc: "Decentralized contract escrow automatically distributes USDC prizes to verified winners.",
                  },
                ].map((item, i) => (
                  <motion.div
                    variants={fadeIn}
                    key={i}
                    className="border-l-2 border-[#00e599]/40 pl-4 py-1"
                  >
                    <h4 className="text-white text-sm font-bold mb-0.5">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Machined Hardware Example Card */}
            <motion.div
              variants={fadeIn}
              className="p-1 rounded-[1.5rem] bg-white/[0.04] border border-white/[0.08]"
            >
              <div className="p-6 rounded-[calc(1.5rem-4px)] bg-[#131722] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <span className="text-xs font-mono tracking-wider text-slate-400 uppercase">Live Scoring Metric</span>
                  <span className="text-xs font-mono font-semibold text-[#00e599] bg-[#00e599]/10 px-2 py-0.5 rounded-full border border-[#00e599]/25">
                    4-2-3-1 FIXTURE
                  </span>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center pb-2.5 border-b border-white/[0.06]">
                    <span className="text-slate-300 text-xs">Formation (4-2-3-1) Exact</span>
                    <span className="text-[#00e599] font-mono font-bold text-xs tabular-nums">+3.0 PTS</span>
                  </div>

                  <div className="flex justify-between items-center pb-2.5 border-b border-white/[0.06]">
                    <span className="text-slate-300 text-xs">Starter Match (10 × 2.5 ST)</span>
                    <span className="text-white font-mono font-bold text-xs tabular-nums">+25.0 PTS</span>
                  </div>

                  <div className="flex justify-between items-center pb-2.5 border-b border-white/[0.06]">
                    <span className="text-slate-300 text-xs">Adjacent Position (RW as RM)</span>
                    <span className="text-sky-400 font-mono font-bold text-xs tabular-nums">+12.0 PTS</span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-white font-heading font-bold text-sm">Total Tactical Points</span>
                    <span className="text-2xl font-mono font-bold text-white tabular-nums tracking-tight">
                      40.0 <span className="text-xs font-normal text-slate-400">PTS</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Restrained Footer */}
      <footer className="border-t border-white/[0.07] bg-[#06070a] text-center text-slate-500 py-10 px-6">
        <p className="font-mono text-xs">
          &copy; {new Date().getFullYear()} BetForm. Built on Stellar Soroban. Non-custodial prediction protocol.
        </p>
      </footer>
    </div>
  );
};
