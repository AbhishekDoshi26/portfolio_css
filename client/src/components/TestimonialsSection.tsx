import { useReducer, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaTimes, FaChevronLeft, FaChevronRight, FaLinkedin } from "react-icons/fa";
import { AppTestimonials, AppSocialLinks } from "@/lib/constants";

type State = {
  expandedIndex: number | null;
  selectedIndex: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

type Action =
  | { type: "SET_EXPANDED"; payload: number | null }
  | { type: "SET_SELECTED_INDEX"; payload: number }
  | { type: "SET_SCROLL_STATUS"; payload: { prev: boolean; next: boolean } };

function testimonialReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_EXPANDED":
      return { ...state, expandedIndex: action.payload };
    case "SET_SELECTED_INDEX":
      return { ...state, selectedIndex: action.payload };
    case "SET_SCROLL_STATUS":
      return {
        ...state,
        canScrollPrev: action.payload.prev,
        canScrollNext: action.payload.next,
      };
    default:
      return state;
  }
}

export default function TestimonialsSection() {
  const [state, dispatch] = useReducer(testimonialReducer, {
    expandedIndex: null,
    selectedIndex: 0,
    canScrollPrev: false,
    canScrollNext: true,
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const updateScrollStatus = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 10;

    dispatch({
      type: "SET_SCROLL_STATUS",
      payload: {
        prev: scrollLeft > 10,
        next: !isAtEnd,
      },
    });

    // Update active dot — pin to last index when at the scroll end
    const lastIndex = AppTestimonials.testimonials.length - 1;
    if (isAtEnd) {
      if (state.selectedIndex !== lastIndex) {
        dispatch({ type: "SET_SELECTED_INDEX", payload: lastIndex });
      }
      return;
    }

    const slideWidth = scrollRef.current.querySelector("div")?.clientWidth || 0;
    if (slideWidth === 0) return;
    const newIndex = Math.min(
      Math.round(scrollLeft / (slideWidth + 32)),
      lastIndex,
    );
    if (newIndex !== state.selectedIndex) {
      dispatch({ type: "SET_SELECTED_INDEX", payload: newIndex });
    }
  }, [state.selectedIndex]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollStatus);
      updateScrollStatus();
      return () => el.removeEventListener("scroll", updateScrollStatus);
    }
  }, [updateScrollStatus]);

  useEffect(() => {
    if (state.expandedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [state.expandedIndex]);

  const scroll = (direction: "prev" | "next") => {
    if (!scrollRef.current) return;
    const slideWidth = scrollRef.current.querySelector('div')?.clientWidth || 0;
    const scrollAmount = (slideWidth + 32) * (direction === "next" ? 1 : -1);
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const openFullTestimonial = (index: number) => {
    dispatch({ type: "SET_EXPANDED", payload: index });
  };

  const closeFullTestimonial = () => {
    dispatch({ type: "SET_EXPANDED", payload: null });
  };

  const getInitialsAvatar = (name: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=128&bold=true`;


  return (
    <section id="testimonials" className="py-32 md:py-48 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-8">
            <FaQuoteLeft className="animate-pulse" />
            Social Proof
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
            Kind <span className="text-gradient-primary">Words</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-10">
            {AppTestimonials.testimonials.length}+ collaborators and tech leaders from around the globe have shared their experience working with me.
          </p>
          <a
            href={AppSocialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/40 text-primary text-sm font-bold tracking-widest uppercase hover:bg-primary/10 transition-all duration-300"
          >
            <FaLinkedin size={16} />
            View All on LinkedIn
          </a>
        </motion.div>

        <div className="relative max-w-[1400px] mx-auto">
          {/* Native Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-12 pt-8 px-4 scrollbar-hide"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {AppTestimonials.testimonials.map((testimonial, index) => {
              const avatarUrl = getInitialsAvatar(testimonial.name);

              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-[85%] md:w-[45%] lg:w-[35%] transition-all duration-500"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div
                    className="glass-card p-8 md:p-12 h-full flex flex-col items-start text-left cursor-pointer group relative overflow-hidden"
                    onClick={() => openFullTestimonial(index)}
                  >
                    <FaQuoteLeft className="absolute -top-4 -right-4 text-foreground/[0.03] text-[6rem] md:text-[10rem] pointer-events-none group-hover:text-primary/5 transition-colors" />

                    <div className="mb-10 relative">
                      <FaQuoteLeft className="text-primary text-4xl opacity-50 mb-6" />
                      <p className="text-xl text-foreground font-medium leading-[1.6] italic line-clamp-6 whitespace-pre-line">
                        "{testimonial.testimonial}"
                      </p>
                    </div>

                    <div className="mt-auto flex items-center gap-5 w-full pt-8 border-t border-border/50">
                      <div className="relative w-16 h-16 shrink-0">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-full h-full rounded-full overflow-hidden border border-border relative z-10">
                          <img
                            src={avatarUrl}
                            alt={testimonial.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-lg text-foreground truncate">{testimonial.name}</h4>
                        <p className="text-primary/80 text-xs font-bold uppercase tracking-[0.2em] truncate">
                          {testimonial.position}
                        </p>
                      </div>
                      {testimonial.linkedin && (
                        <a
                          href={testimonial.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/60 transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaLinkedin size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-12 px-4">
            <div className="flex gap-2.5">
              {AppTestimonials.testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const slideWidth = scrollRef.current?.querySelector('div')?.clientWidth || 0;
                    scrollRef.current?.scrollTo({ left: i * (slideWidth + 32), behavior: "smooth" });
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${state.selectedIndex === i ? "w-10 bg-primary" : "bg-primary/20 hover:bg-primary/40 w-1.5"
                    }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => scroll("prev")}
                disabled={!state.canScrollPrev}
                className="w-14 h-14 rounded-full glass border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-glass"
              >
                <FaChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll("next")}
                disabled={!state.canScrollNext}
                className="w-14 h-14 rounded-full glass border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-glass"
              >
                <FaChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expansion Modal */}
      <AnimatePresence>
        {state.expandedIndex !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/90 backdrop-blur-2xl"
              onClick={closeFullTestimonial}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] max-w-4xl w-[95%] md:w-full relative z-10 border border-border/50 shadow-2xl flex flex-col max-h-[90vh]"
            >
              {(() => {
                const expandedTestimonial = AppTestimonials.testimonials[state.expandedIndex!];
                const avatarUrl = getInitialsAvatar(expandedTestimonial.name);

                return (
                  <>
                    <button
                      onClick={closeFullTestimonial}
                      className="absolute top-4 right-4 md:top-8 md:right-8 text-muted-foreground hover:text-foreground transition-colors p-3 bg-accent/30 hover:bg-accent rounded-full z-20"
                    >
                      <FaTimes size={20} className="md:w-6 md:h-6" />
                    </button>

                    <div className="flex-1 overflow-y-auto pr-4 mb-10 md:mb-16 scrollbar-hide">
                      <FaQuoteLeft className="text-primary text-4xl md:text-6xl opacity-30 mb-6 md:mb-10" />
                      <p className="text-xl md:text-3xl text-foreground leading-[1.6] font-medium italic whitespace-pre-line">
                        "{expandedTestimonial.testimonial}"
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-primary/20 p-1 shrink-0">
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <img
                            src={avatarUrl}
                            alt={expandedTestimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">{expandedTestimonial.name}</h4>
                        <p className="text-primary font-bold tracking-widest uppercase text-[0.7rem] md:text-sm">
                          {expandedTestimonial.position}
                        </p>
                      </div>
                      {expandedTestimonial.linkedin && (
                        <a
                          href={expandedTestimonial.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-accent/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/60 transition-all shrink-0"
                        >
                          <FaLinkedin size={22} />
                        </a>
                      )}
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}