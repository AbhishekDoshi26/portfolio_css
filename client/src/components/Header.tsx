import { useEffect, useReducer, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { AppNavLinks, AppPersonalDetails } from "@/lib/constants";
import { FaBars, FaTimes, FaCircle } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

type State = {
  isMenuOpen: boolean;
  isScrolled: boolean;
  activePath: string;
};

type Action =
  | { type: "TOGGLE_MENU" }
  | { type: "SET_MENU_OPEN"; payload: boolean }
  | { type: "SET_SCROLLED"; payload: boolean }
  | { type: "SET_ACTIVE_PATH"; payload: string };

function headerReducer(state: State, action: Action): State {
  switch (action.type) {
    case "TOGGLE_MENU":
      return { ...state, isMenuOpen: !state.isMenuOpen };
    case "SET_MENU_OPEN":
      return { ...state, isMenuOpen: action.payload };
    case "SET_SCROLLED":
      return { ...state, isScrolled: action.payload };
    case "SET_ACTIVE_PATH":
      return { ...state, activePath: action.payload };
    default:
      return state;
  }
}

export default function Header() {
  const [location, setLocation] = useLocation();
  const [state, dispatch] = useReducer(headerReducer, {
    isMenuOpen: false,
    isScrolled: false,
    activePath: location,
  });

  const isScrollingRef = useRef(false);

  useEffect(() => {
    dispatch({ type: "SET_ACTIVE_PATH", payload: location });
  }, [location]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          dispatch({ type: "SET_SCROLLED", payload: window.scrollY > 50 });

          if (!isScrollingRef.current) {
            const sections = document.querySelectorAll("section[id]");
            let currentSectionId = "/";

            sections.forEach((section) => {
              const sectionTop = (section as HTMLElement).offsetTop - 200;
              const sectionHeight = section.clientHeight;
              const sectionId = section.getAttribute("id");

              if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight && sectionId) {
                const mappedId = sectionId === "skills" ? "about" : sectionId;
                currentSectionId = mappedId === "home" ? "/" : `/${mappedId}`;
              }
            });

            if (state.activePath !== currentSectionId) {
              dispatch({ type: "SET_ACTIVE_PATH", payload: currentSectionId });
              window.history.replaceState(null, "", currentSectionId);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [state.activePath]);

  useEffect(() => {
    if (state.isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [state.isMenuOpen]);

  const handleLinkClick = (path: string) => {
    dispatch({ type: "SET_MENU_OPEN", payload: false });
    dispatch({ type: "SET_ACTIVE_PATH", payload: path });

    isScrollingRef.current = true;

    const sectionId = path === "/" ? "home" : path.substring(1);
    const element = document.getElementById(sectionId);

    if (path === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      window.history.pushState(null, "", path);
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1200);
    } else if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.pushState(null, "", path);
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1200);
    } else {
      setLocation(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
      isScrollingRef.current = false;
    }
  };

  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-200 ease-apple-ease ${state.isScrolled ? "top-6 w-[90%] md:w-auto" : "top-10 w-[95%] md:w-auto"
        }`}
    >
      <nav
        className={`glass rounded-full px-4 py-2 md:px-8 md:py-3 flex justify-between items-center gap-10 transition-all duration-200 ease-apple-ease ${state.isScrolled ? "bg-background/60 shadow-2xl shadow-primary/10 border-border" : "bg-background/20 border-border/50"
          }`}
      >
        <a
          className="text-lg md:text-xl font-bold tracking-tight text-foreground group cursor-pointer"
          onClick={() => handleLinkClick("/")}
        >
          {AppPersonalDetails.fullName.split(" ")[0]}
          <span className="text-primary group-hover:animate-pulse">.</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {AppNavLinks.links.map((link) => {
            const isActive = state.activePath === link.path;
            return (
              <a
                key={link.path}
                className={`relative px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full cursor-pointer ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.path);
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-accent rounded-full border border-border/50"
                    transition={{
                      type: "spring",
                      stiffness: 1200,
                      damping: 60,
                      mass: 0.1,
                    }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggle />

          <a
            className="hidden md:flex apple-button-primary !py-2.5 !px-6 !text-[10px] !font-bold !uppercase !tracking-[0.2em] items-center gap-2 group cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("/contact");
            }}
          >
            <FaCircle className="text-[6px] animate-pulse" />
            Contact
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-12 h-12 rounded-full bg-accent/50 flex items-center justify-center text-foreground text-lg transition-colors hover:bg-accent border border-border"
            onClick={() => dispatch({ type: "TOGGLE_MENU" })}
            aria-label="Toggle menu"
          >
            {state.isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {state.isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-full left-0 right-0 mt-4 glass rounded-[2.5rem] overflow-hidden md:hidden border-border p-8 shadow-2xl"
          >
            <div className="flex flex-col gap-6">
              {AppNavLinks.links.map((link) => {
                const isActive = state.activePath === link.path;
                return (
                  <a
                    key={link.path}
                    className={`text-xl font-bold tracking-tight transition-all duration-300 cursor-pointer ${isActive ? "text-primary translate-x-2" : "text-muted-foreground"
                      }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.path);
                    }}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="pt-6 border-t border-border/50">
                <a
                  className="apple-button-primary flex items-center justify-center gap-3 py-5 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("/contact");
                  }}
                >
                  <FaCircle className="text-[6px] animate-pulse" />
                  <span className="font-bold uppercase tracking-widest text-xs">Start a Project</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
