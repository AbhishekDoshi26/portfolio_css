import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { TESTIMONIALS } from '@/lib/constants';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === TESTIMONIALS.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? TESTIMONIALS.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-20">
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
          Testimonials from clients and colleagues I've had the pleasure to work with
        </motion.p>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="bg-muted rounded-2xl shadow-lg p-8 md:p-10 relative overflow-hidden"
          >
            <FaQuoteLeft className="text-primary/20 text-6xl absolute top-8 left-8" />
            <FaQuoteRight className="text-primary/20 text-6xl absolute bottom-8 right-8" />
            
            <div className="flex flex-col md:flex-row items-center mb-6 md:mb-10 relative z-10">
              <div className="w-24 h-24 mb-4 md:mb-0 md:mr-6 rounded-full overflow-hidden border-2 border-primary">
                <img 
                  src={currentTestimonial.image} 
                  alt={currentTestimonial.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback for broken images
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentTestimonial.name) + '&background=10B981&color=fff';
                  }}
                />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold">{currentTestimonial.name}</h4>
                <p className="text-primary">{currentTestimonial.position}</p>
              </div>
            </div>
            
            <div className="relative z-10 text-muted-foreground leading-relaxed whitespace-pre-line">
              {currentTestimonial.testimonial}
            </div>
          </motion.div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="bg-muted hover:bg-primary/20 text-primary p-3 rounded-full transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft />
            </button>
            <div className="flex space-x-2 items-center">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? 'bg-primary' : 'bg-primary/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="bg-muted hover:bg-primary/20 text-primary p-3 rounded-full transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}