import {
  Target,
  LayoutTemplate,
  ArrowRight,
  PlayCircle,
  Trophy,
  Activity,
} from "lucide-react";
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
    <div className="min-h-screen bg-bg-base overflow-hidden relative">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary-glow blur-[120px] rounded-full pointer-events-none opacity-40"></div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-heading font-black text-2xl tracking-tight">
            <span className="text-white">Bet</span>
            <span className="text-primary">Form</span>
          </div>
          <button
            onClick={openModal}
            className="px-6 py-2.5 bg-primary text-bg-base font-bold rounded-full hover:bg-primary-hover transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]"
          >
            Play Now
          </button>
        </div>
      </header>

      <main className="pt-32 pb-20 max-w-6xl mx-auto px-6 space-y-40 relative z-10">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center space-y-8 mt-12 md:mt-24"
        >
          <motion.h1
            variants={fadeIn}
            className="text-4xl md:text-6xl font-heading font-black leading-[1.1] tracking-tight"
          >
            Prove Your <br />
            <span className="text-primary">
              Tactical Genius
            </span>
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Predict starting formations and the starting XI for every football
            match. Compete on a skill-based global leaderboard. No money
            involved, just pure tactical glory.
          </motion.p>
          <motion.div
            variants={fadeIn}
            className="flex justify-center gap-4 pt-8"
          >
            <button
              onClick={openModal}
              className="group flex items-center gap-2 px-8 py-4 bg-primary text-bg-base font-bold rounded-full text-base transition-all hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]"
            >
              Start Predicting
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
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
              className="text-3xl md:text-4xl font-heading font-bold"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-slate-400 text-base max-w-2xl mx-auto"
            >
              Three simple steps to test your football knowledge against the
              world.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: PlayCircle,
                title: "1. Pick a Match",
                desc: "Browse upcoming fixtures. Make your predictions before the match locks down prior to kickoff.",
              },
              {
                icon: LayoutTemplate,
                title: "2. Choose Formation",
                desc: "Select from 15 different tactical setups. Will they play a conservative 5-4-1 or an attacking 4-3-3?",
              },
              {
                icon: Target,
                title: "3. Draft the XI",
                desc: "Fill the positional slots with the exact players you believe the manager will trust from the opening whistle.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="glass-panel p-8 rounded-3xl group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
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
          className="glass-panel border-primary/20 rounded-[3rem] p-8 md:p-16 relative overflow-hidden"
        >
          {/* Internal ambient glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.h2
                  variants={fadeIn}
                  className="text-3xl md:text-4xl font-heading font-bold"
                >
                  Odds-Based Scoring
                </motion.h2>
                <motion.p
                  variants={fadeIn}
                  className="text-base text-slate-300"
                >
                  Not all predictions are created equal. Our unique scoring
                  system rewards you for making bold, accurate calls.
                </motion.p>
              </div>
              <ul className="space-y-6">
                {[
                  {
                    title: "Formation Odds",
                    desc: "Predicting an obscure formation like a 3-3-3-1 yields higher multipliers than a standard 4-3-3.",
                  },
                  {
                    title: "Proximity Scoring",
                    desc: "Get points even if you're slightly off. Predict a player as RW, but they start at RM? You still earn partial points.",
                  },
                  {
                    title: "Position Multipliers",
                    desc: "Correctly predicting attackers carries different weight than nailing the goalkeeper selection.",
                  },
                ].map((item, i) => (
                  <motion.li
                    variants={fadeIn}
                    key={i}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                      <Activity size={16} />
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      <strong className="text-white block font-heading mb-1 text-base">
                        {item.title}
                      </strong>
                      {item.desc}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              variants={fadeIn}
              className="bg-bg-base/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 blur-2xl rounded-full"></div>
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                  <span className="text-slate-400 flex items-center gap-2">
                    <LayoutTemplate size={16} /> Formation (4-2-3-1) Correct
                  </span>
                  <span className="text-primary font-bold">+3.0 pts</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Target size={16} /> Exact Player Match (10 × 2.5)
                  </span>
                  <span className="text-primary font-bold">+25.0 pts</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                  <span className="text-slate-400 text-sm flex items-center gap-2">
                    <Activity size={16} /> Proximity Match (RW as RM)
                  </span>
                  <span className="text-accent text-sm font-bold">
                    +12.0 pts
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-white font-heading font-bold text-xl flex items-center gap-2">
                    <Trophy size={20} className="text-yellow-400" /> Total Score
                  </span>
                  <span className="text-primary font-heading font-black text-3xl drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                    40.0 pts
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <footer className="mt-32 border-t border-white/5 bg-bg-base text-center text-slate-600 py-12">
        <p className="font-heading">
          &copy; {new Date().getFullYear()} BetForm. Not affiliated with FIFA.
        </p>
      </footer>
    </div>
  );
};
