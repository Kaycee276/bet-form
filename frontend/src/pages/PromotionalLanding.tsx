import { Target, LayoutTemplate, ArrowRight, PlayCircle } from "lucide-react";
import { useModalStore } from "../store/useModalStore";

export const PromotionalLanding = () => {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-black border-b border-primary/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-bold text-2xl">
            BetForm
          </div>
          <button
            onClick={openModal}
            className="px-6 py-2 bg-primary text-black font-bold rounded-full hover:bg-primary-dark transition-colors"
          >
            Play Now
          </button>
        </div>
      </header>

      <main className="pt-24 max-w-6xl mx-auto px-4 space-y-32">
        {/* Hero Section */}
        <section className="text-center space-y-8 mt-12">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Prove Your <br />
            <span className="text-primary">Tactical Genius</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Predict starting formations and the starting XI for every World Cup
            match. Compete on a skill-based global leaderboard. No money
            involved, just pure tactical glory.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={openModal}
              className="flex items-center gap-2 px-8 py-4 bg-primary text-black font-bold rounded-full text-lg hover:bg-primary-dark transition-all hover:scale-105"
            >
              Start Predicting <ArrowRight size={20} />
            </button>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="space-y-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">
              Three simple steps to test your football knowledge.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-bg-card p-8 rounded-3xl border border-primary/10 hover:border-primary/30 transition-colors">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <PlayCircle size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3">1. Pick a Match</h3>
              <p className="text-gray-400">
                Browse upcoming fixtures. Make your predictions before the match
                locks down prior to kickoff.
              </p>
            </div>

            <div className="bg-bg-card p-8 rounded-3xl border border-primary/10 hover:border-primary/30 transition-colors">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <LayoutTemplate size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3">2. Choose Formation</h3>
              <p className="text-gray-400">
                Select from 15 different tactical setups. Will they play a
                conservative 5-4-1 or an attacking 4-3-3?
              </p>
            </div>

            <div className="bg-bg-card p-8 rounded-3xl border border-primary/10 hover:border-primary/30 transition-colors">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3">3. Draft the XI</h3>
              <p className="text-gray-400">
                Fill the positional slots with the exact players you believe the
                manager will trust from the opening whistle.
              </p>
            </div>
          </div>
        </section>

        {/* Scoring System Section */}
        <section className="bg-bg-card border border-primary/20 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Odds-Based Scoring</h2>
              <p className="text-lg text-gray-300">
                Not all predictions are created equal. Our unique scoring system
                rewards you for making bold, accurate calls.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 text-sm">
                    ✓
                  </div>
                  <p className="text-gray-300">
                    <strong className="text-white">Formation Odds:</strong>{" "}
                    Predicting an obscure formation like a 3-3-3-1 yields higher
                    multipliers than a standard 4-3-3.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 text-sm">
                    ✓
                  </div>
                  <p className="text-gray-300">
                    <strong className="text-white">Proximity Scoring:</strong>{" "}
                    Get points even if you're slightly off. Predict a player as
                    RW, but they start at RM? You still earn partial points.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 text-sm">
                    ✓
                  </div>
                  <p className="text-gray-300">
                    <strong className="text-white">
                      Position Multipliers:
                    </strong>{" "}
                    Correctly predicting attackers carries different weight than
                    nailing the goalkeeper selection.
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-black border border-gray-800 rounded-3xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                  <span className="text-gray-400">
                    Formation (4-2-3-1) Correct
                  </span>
                  <span className="text-primary font-bold">+3.0 pts</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                  <span className="text-gray-400">
                    Exact Player Match (10 × 2.5)
                  </span>
                  <span className="text-primary font-bold">+25.0 pts</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                  <span className="text-gray-400">
                    Proximity Match (RW as RM)
                  </span>
                  <span className="text-primary font-bold">+12.0 pts</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-white font-bold text-xl">
                    Total Score
                  </span>
                  <span className="text-primary font-bold text-2xl">
                    40.0 pts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-32 text-center text-gray-500 pb-8">
        <p>© {new Date().getFullYear()} BetForm. Not affiliated with FIFA.</p>
      </footer>
    </div>
  );
};
