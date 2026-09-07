import { ArrowRight } from "lucide-react";
import { useModalStore } from "../store/useModalStore";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const PromotionalLanding = () => {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden relative text-slate-100">
      {/* Brighter background ambient glass glows */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-emerald-400/20 rounded-full blur-[140px] pointer-events-none -translate-y-1/3"></div>
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-cyan-400/20 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-[800px] h-[800px] bg-indigo-400/15 rounded-full blur-[180px] pointer-events-none"></div>

      {/* Glass Header */}
      <header className="fixed top-0 w-full z-50 glass-nav border-b border-white/15">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-heading font-black text-2xl tracking-tight">
            <span className="text-white">Bet</span>
            <span className="text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]">Form</span>
          </div>
          <button
            onClick={openModal}
            className="px-6 py-2.5 glass-button-primary text-slate-950 font-extrabold rounded-full text-sm transition-all"
          >
            Play Now
          </button>
        </div>
      </header>

      <main className="pt-32 pb-20 max-w-6xl mx-auto px-6 space-y-36 relative z-10">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center space-y-8 mt-12 md:mt-20"
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-black uppercase tracking-wider mb-2 border border-emerald-400/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Tactical Prediction Platform
          </motion.div>

          <motion.h1
            variants={fadeIn}
            className="text-4xl md:text-7xl font-heading font-black leading-[1.1] tracking-tight text-white drop-shadow-md"
          >
            Prove Your <br />
            <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(52,211,153,0.5)]">
              Tactical Genius
            </span>
          </motion.h1>
          
          <motion.p
            variants={fadeIn}
            className="text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Predict starting formations and the starting XI for football
            matches. Compete on a skill-based global leaderboard with real-time scoring. No money
            involved — just pure tactical glory.
          </motion.p>
          
          <motion.div
            variants={fadeIn}
            className="flex justify-center gap-4 pt-4"
          >
            <button
              onClick={openModal}
              className="group flex items-center gap-3 px-9 py-4 glass-button-primary text-slate-950 font-black rounded-full text-base"
            >
              Start Predicting
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1.5 transition-transform"
              />
            </button>
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
              className="text-3xl md:text-5xl font-heading font-extrabold text-white"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-slate-300 text-base max-w-2xl mx-auto font-medium"
            >
              Three simple steps to test your tactical knowledge against managers worldwide.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Pick a Match",
                desc: "Browse upcoming fixtures across top leagues. Submit your predictions before match lockdown prior to kickoff.",
              },
              {
                num: "02",
                title: "Choose Formation",
                desc: "Select from 15 distinct tactical setups. Will they deploy a conservative 5-4-1 or an aggressive 4-3-3?",
              },
              {
                num: "03",
                title: "Draft the XI",
                desc: "Fill the positional slots with the exact players you believe the manager will trust from the opening whistle.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -6 }}
                className="glass-card p-8 rounded-3xl group relative overflow-hidden border border-white/20"
              >
                <div className="text-3xl font-heading font-black text-emerald-400 mb-4 tracking-tight">
                  {step.num}
                </div>
                <h3 className="text-xl font-heading font-bold mb-3 text-white">
                  {step.title}
                </h3>
                <p className="text-slate-200 text-sm leading-relaxed font-normal">
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
          className="glass-panel glass-panel-glow rounded-[3rem] p-8 md:p-16 relative overflow-hidden border border-white/20"
        >
          {/* Internal ambient glass glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.h2
                  variants={fadeIn}
                  className="text-3xl md:text-4xl font-heading font-extrabold text-white"
                >
                  Odds-Based Scoring
                </motion.h2>
                <motion.p
                  variants={fadeIn}
                  className="text-base text-slate-200 font-medium"
                >
                  Not all predictions carry equal weight. Our weighted scoring
                  engine rewards managers for making bold, tactical calls.
                </motion.p>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Formation Odds Multipliers",
                    desc: "Predicting a rare tactical setup like 3-3-3-1 yields higher multipliers than a standard 4-3-3.",
                  },
                  {
                    title: "Proximity Scoring Engine",
                    desc: "Earn partial credit even on tight calls. Predict a player as RW, but they start at RM? You still score points.",
                  },
                  {
                    title: "Position Multipliers",
                    desc: "Nailing key attacking and midfield starting slots carries higher point multipliers.",
                  },
                ].map((item, i) => (
                  <motion.div
                    variants={fadeIn}
                    key={i}
                    className="border-l-2 border-emerald-400 pl-4 py-1"
                  >
                    <h4 className="text-white font-heading text-base font-extrabold mb-1">
                      {item.title}
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              variants={fadeIn}
              className="glass-card rounded-3xl p-8 relative shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-400/25 blur-3xl rounded-full pointer-events-none"></div>
              
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center pb-4 border-b border-white/15">
                  <span className="text-slate-200 text-sm font-bold">
                    Formation (4-2-3-1) Correct
                  </span>
                  <span className="text-emerald-400 font-extrabold">+3.0 pts</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-white/15">
                  <span className="text-slate-200 text-sm font-bold">
                    Exact Player Match (10 × 2.5)
                  </span>
                  <span className="text-emerald-400 font-extrabold">+25.0 pts</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-white/15">
                  <span className="text-slate-200 text-sm font-bold">
                    Proximity Match (RW as RM)
                  </span>
                  <span className="text-teal-300 text-sm font-extrabold">
                    +12.0 pts
                  </span>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <span className="text-white font-heading font-black text-xl">
                    Total Score
                  </span>
                  <span className="text-emerald-400 font-heading font-black text-3xl drop-shadow-[0_0_20px_rgba(52,211,153,0.7)]">
                    40.0 pts
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <footer className="mt-32 border-t border-white/15 glass-panel text-center text-slate-300 py-12">
        <p className="font-heading text-sm font-medium">
          &copy; {new Date().getFullYear()} BetForm. All rights reserved. Not affiliated with FIFA, UEFA, or any official football body.
        </p>
      </footer>
    </div>
  );
};
