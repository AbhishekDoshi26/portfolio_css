import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import { TESTIMONIALS } from '@/lib/constants';

export default function TestimonialsSection() {
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
              className="bg-muted rounded-2xl shadow-lg p-6 relative h-full flex flex-col"
            >
              <FaQuoteLeft className="text-primary/20 text-4xl mb-4" />
              
              <div className="mb-6 flex-grow">
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {testimonial.testimonial.length > 250 
                    ? `${testimonial.testimonial.substring(0, 250)}...` 
                    : testimonial.testimonial}
                </p>
              </div>
              
              <div className="flex items-center mt-auto pt-4 border-t border-primary/10">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30 mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback for broken images
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(testimonial.name) + '&background=10B981&color=fff';
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-primary text-sm">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}