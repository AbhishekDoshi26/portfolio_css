import { useReducer, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaStar, FaTimes, FaCube } from "react-icons/fa";
import { SiFlutter } from "react-icons/si";
import { AppFlutterPackages } from "@/lib/constants";

type State = {
  selectedPackageIndex: number | null;
};

type Action =
  | { type: "OPEN_PACKAGE"; payload: number }
  | { type: "CLOSE_PACKAGE" };

function packageReducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPEN_PACKAGE":
      return { ...state, selectedPackageIndex: action.payload };
    case "CLOSE_PACKAGE":
      return { ...state, selectedPackageIndex: null };
    default:
      return state;
  }
}

export default function PackagesSection() {
  const [state, dispatch] = useReducer(packageReducer, {
    selectedPackageIndex: null,
  });

  useEffect(() => {
    if (state.selectedPackageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [state.selectedPackageIndex]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 80,
      },
    },
  };

  const selectedPackage = state.selectedPackageIndex !== null
    ? AppFlutterPackages.packages[state.selectedPackageIndex]
    : null;

  return (
    <section id="packages" className="py-32 md:py-48 relative overflow-hidden bg-accent/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-8">
            <FaCube className="animate-pulse" />
            Open Source
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
            Building the <span className="text-gradient-primary">Ecosystem</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-xl leading-relaxed">
            Scalable libraries and developer tools crafted for the Flutter community,
            empowering thousands of developers worldwide.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {AppFlutterPackages.packages.map((pkg, index) => (
            <motion.div
              key={index}
              variants={item}
              onClick={() => dispatch({ type: "OPEN_PACKAGE", payload: index })}
              className="glass-card p-10 cursor-pointer flex flex-col group hover:bg-accent/40 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/20 group-hover:rotate-6 group-hover:scale-110 transition-all duration-700">
                  <SiFlutter className="text-white text-3xl" />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-border group-hover:bg-accent/60 transition-colors">
                  <FaStar className="text-amber-400 text-sm" />
                  <span className="text-sm font-bold text-foreground">{pkg.stars}</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors tracking-tight">
                {pkg.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-10 flex-grow text-sm">
                {pkg.description}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-border/50">
                <div className="flex gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Library</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Dart</span>
                </div>
                <div className="text-primary text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-500">
                  Explore
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Package Details Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => dispatch({ type: "CLOSE_PACKAGE" })}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-2xl glass-card p-12 md:p-16 overflow-hidden border-border"
            >
              <button
                className="absolute top-8 right-8 text-muted-foreground/40 hover:text-foreground transition-all p-3 rounded-full hover:bg-accent/50"
                onClick={() => dispatch({ type: "CLOSE_PACKAGE" })}
              >
                <FaTimes size={20} />
              </button>

              <div className="flex flex-col sm:flex-row gap-10 mb-12 items-center sm:items-start text-center sm:text-left">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-[2.5rem] flex items-center justify-center shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)]">
                  <SiFlutter className="text-white text-5xl" />
                </div>
                <div className="pt-2">
                  <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-foreground">{selectedPackage.name}</h3>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                      <FaStar className="text-amber-400" />
                      <span className="text-sm font-bold text-primary">{selectedPackage.stars} GitHub Stars</span>
                    </div>
                    <span className="text-muted-foreground text-sm font-medium tracking-wide">v2.4.0 • Semantic Versioning</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8 mb-12">
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
                  {selectedPackage.description}
                </p>
                <div className="grid grid-cols-2 gap-4 py-8 border-y border-border/50">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">Platform</p>
                    <p className="text-foreground font-bold">Cross-Platform</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">License</p>
                    <p className="text-foreground font-bold">MIT Open Source</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <a
                  href={selectedPackage.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-button-primary flex items-center justify-center gap-4 flex-1 py-5"
                >
                  <FaGithub size={22} />
                  <span className="font-bold">GitHub Repository</span>
                </a>
                <a
                  href={selectedPackage.pub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-button-secondary flex items-center justify-center gap-4 flex-1 py-5"
                >
                  <FaExternalLinkAlt size={18} />
                  <span className="font-bold">Pub.dev Specs</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}