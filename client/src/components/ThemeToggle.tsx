import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full bg-accent/50 border border-border flex items-center justify-center text-foreground transition-all duration-300 hover:bg-accent group overflow-hidden"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: 20, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.3, ease: "anticipate" }}
          className="text-lg"
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </motion.div>
      </AnimatePresence>
      
      {/* Subtle background pulse */}
      <div className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
    </button>
  );
}
