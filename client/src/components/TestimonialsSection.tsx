import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaTimes, FaExpand } from 'react-icons/fa';
import { TESTIMONIALS } from '@/lib/constants';

export default function TestimonialsSection() {
  const [expandedTestimonial, setExpandedTestimonial] = useState<number | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const openFullTestimonial = (index: number) => {
    setExpandedTestimonial(index);
    document.body.style.overflow = 'hidden';
  };

  const closeFullTestimonial = () => {
    setExpandedTestimonial(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-6"
        >
          What People <span className="text-gradient">Say</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-12"
        >
          Testimonials from clients and colleagues who value our collaboration
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-muted rounded-2xl shadow-lg p-6 relative h-full flex flex-col group hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
            >
              <FaQuoteLeft className="text-primary/20 text-4xl mb-4" />
              
              <div className="mb-6 flex-grow">
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {testimonial.testimonial.length > 250 
                    ? `${testimonial.testimonial.substring(0, 250)}...` 
                    : testimonial.testimonial}
                </p>
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-primary/10">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30 mr-4">
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
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-primary text-sm">{testimonial.position}</p>
                  </div>
                </div>
                <button 
                  onClick={() => openFullTestimonial(index)}
                  className="p-2 text-primary/70 hover:text-primary hover:bg-primary/10 rounded-full transition-colors duration-300"
                  aria-label="Read full testimonial"
                >
                  <FaExpand className="text-sm" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Full testimonial modal */}
      <AnimatePresence>
        {expandedTestimonial !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 sm:p-6 md:p-10"
            onClick={closeFullTestimonial}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-background p-6 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 mr-4">
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
                    <h3 className="text-xl font-bold">{TESTIMONIALS[expandedTestimonial].name}</h3>
                    <p className="text-primary">{TESTIMONIALS[expandedTestimonial].position}</p>
                  </div>
                </div>
                <button 
                  onClick={closeFullTestimonial}
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-colors duration-300"
                  aria-label="Close testimonial"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <div className="relative text-muted-foreground">
                <FaQuoteLeft className="text-primary/20 text-6xl absolute top-0 left-0 transform -translate-x-2 -translate-y-2" />
                <div className="pl-8 pt-6 whitespace-pre-line leading-relaxed">
                  {TESTIMONIALS[expandedTestimonial].testimonial}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}