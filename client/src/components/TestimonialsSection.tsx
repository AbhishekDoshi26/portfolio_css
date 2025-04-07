import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaTimes, FaExpand, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { TESTIMONIALS } from '@/lib/constants';
import useEmblaCarousel from 'embla-carousel-react';

export default function TestimonialsSection() {
  const [expandedTestimonial, setExpandedTestimonial] = useState<number | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const openFullTestimonial = (index: number) => {
    setExpandedTestimonial(index);
    document.body.style.overflow = 'hidden';
  };

  const closeFullTestimonial = () => {
    setExpandedTestimonial(null);
    document.body.style.overflow = 'auto';
  };

  const renderTestimonialCard = (testimonial: typeof TESTIMONIALS[0], index: number) => (
    <div className="embla__slide p-5" key={index}>
      <div 
        className="bg-gradient-to-br from-muted to-muted/80 rounded-lg border border-primary/10 shadow-lg p-7 relative h-full flex flex-col group hover:shadow-primary/20 hover:-translate-y-1.5 transition-all duration-300"
      >
        <FaQuoteLeft className="text-primary/30 text-4xl absolute top-4 left-4" />
        
        <div className="mb-8 flex-grow pl-6 pt-8">
          <p className="text-muted-foreground leading-relaxed text-sm">
            {testimonial.testimonial.length > 200 
              ? `${testimonial.testimonial.substring(0, 200).trim()}...` 
              : testimonial.testimonial}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-5 border-t border-primary/10">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/40 mr-4 shadow-md shadow-primary/10">
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback for broken images
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(testimonial.name) + '&background=3B82F6&color=fff';
                }}
              />
            </div>
            <div>
              <h4 className="font-bold text-base">{testimonial.name}</h4>
              <p className="text-primary text-sm font-medium">{testimonial.position}</p>
            </div>
          </div>
          <button 
            onClick={() => openFullTestimonial(index)}
            className="p-2.5 text-primary/70 hover:text-primary hover:bg-primary/10 rounded-full transition-colors duration-300"
            aria-label="Read full testimonial"
          >
            <FaExpand className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-3"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">my testimonials</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-center mb-3"
        >
          <span className="text-gradient">Testimonials</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 whitespace-pre-line"
        >
          Since 2018 I have been a visionary and a reliable software engineering partner
          for many startups and individuals. Here are few testimonials.
        </motion.p>

        <div className="relative pb-12">
          {/* Carousel container */}
          <div className="embla overflow-hidden rounded-xl" ref={emblaRef}>
            <div className="embla__container flex py-2">
              {TESTIMONIALS.map((testimonial, index) => (
                renderTestimonialCard(testimonial, index)
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-background to-background/80 backdrop-blur-sm p-4 rounded-full shadow-lg z-10 -ml-4 hover:bg-background transition-all duration-300 border border-primary/10"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-lg text-primary" />
          </button>
          
          <button 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-background to-background/80 backdrop-blur-sm p-4 rounded-full shadow-lg z-10 -mr-4 hover:bg-background transition-all duration-300 border border-primary/10"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-lg text-primary" />
          </button>
          
          {/* Dots indicator */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center mt-8">
            <div className="flex space-x-3 bg-muted/40 backdrop-blur-sm py-1.5 px-4 rounded-full shadow-inner border border-primary/5">
              {selectedIndex > 0 && (
                <button
                  onClick={() => emblaApi?.scrollTo(0)}
                  className="text-xs text-primary/70 hover:text-primary px-1"
                  aria-label="Go to first testimonial"
                >
                  «
                </button>
              )}
              
              {Array.from({ length: 5 }).map((_, i) => {
                const index = Math.max(0, Math.min(selectedIndex - 2 + i, TESTIMONIALS.length - 1));
                return (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      selectedIndex === index 
                        ? 'bg-primary scale-125 shadow-md' 
                        : 'bg-gray-400/50 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                );
              })}
              
              {selectedIndex < TESTIMONIALS.length - 1 && (
                <button
                  onClick={() => emblaApi?.scrollTo(TESTIMONIALS.length - 1)}
                  className="text-xs text-primary/70 hover:text-primary px-1"
                  aria-label="Go to last testimonial"
                >
                  »
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full testimonial modal */}
      <AnimatePresence>
        {expandedTestimonial !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6 md:p-10"
            onClick={closeFullTestimonial}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-background to-background/95 p-8 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl border border-primary/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8 border-b border-primary/10 pb-6">
                <div className="flex items-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/40 mr-5 shadow-md shadow-primary/10">
                    <img 
                      src={TESTIMONIALS[expandedTestimonial].image} 
                      alt={TESTIMONIALS[expandedTestimonial].name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(TESTIMONIALS[expandedTestimonial].name) + '&background=3B82F6&color=fff';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{TESTIMONIALS[expandedTestimonial].name}</h3>
                    <p className="text-primary font-medium">{TESTIMONIALS[expandedTestimonial].position}</p>
                  </div>
                </div>
                <button 
                  onClick={closeFullTestimonial}
                  className="p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-colors duration-300"
                  aria-label="Close testimonial"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <div className="relative text-muted-foreground">
                <FaQuoteLeft className="text-primary/20 text-7xl absolute top-0 left-0 transform -translate-x-4 -translate-y-6" />
                <div className="pl-10 pt-8 whitespace-pre-line leading-relaxed text-base">
                  {TESTIMONIALS[expandedTestimonial].testimonial}
                </div>
              </div>

              {/* Pagination controls for testimonials */}
              <div className="mt-10 pt-6 border-t border-primary/10 flex justify-between">
                <button
                  className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md transition-colors ${
                    expandedTestimonial === 0 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-primary hover:bg-primary/10'
                  }`}
                  disabled={expandedTestimonial === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedTestimonial(expandedTestimonial - 1);
                  }}
                >
                  <FaChevronLeft size={12} />
                  Previous
                </button>
                
                <button
                  className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md transition-colors ${
                    expandedTestimonial === TESTIMONIALS.length - 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-primary hover:bg-primary/10'
                  }`}
                  disabled={expandedTestimonial === TESTIMONIALS.length - 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedTestimonial(expandedTestimonial + 1);
                  }}
                >
                  Next
                  <FaChevronRight size={12} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}