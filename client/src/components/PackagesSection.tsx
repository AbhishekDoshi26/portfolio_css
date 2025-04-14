import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import { SiFlutter } from 'react-icons/si';
import { FLUTTER_PACKAGES } from '@/lib/constants';

export default function PackagesSection() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const openPackageDetails = (index: number) => {
    setSelectedPackage(index);
    document.body.style.overflow = 'hidden';
  };

  const closePackageDetails = () => {
    setSelectedPackage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="packages" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-6"
        >
          Flutter <span className="text-gradient">Packages</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-12"
        >
          Open-source Flutter packages I've developed to solve common problems
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FLUTTER_PACKAGES.map((pkg, index) => (
            <motion.div
              key={index}
              variants={item}
              onClick={() => openPackageDetails(index)}
              className="bg-muted hover:bg-muted/80 rounded-xl p-6 cursor-pointer transition-all duration-300 shadow-md hover:shadow-primary/10 hover:translate-y-[-5px] relative flex flex-col"
            >
              <div className="absolute top-4 right-4 flex items-center text-primary/70 font-medium">
                <FaStar className="mr-1 text-amber-400 animate-pulse" />
                <span>{pkg.name === 'parent_child_checkbox' ? '40+' : pkg.name === 'super_extensions' ? '10+' : pkg.stars}</span>
              </div>

              <div className="flex items-center mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-primary to-primary/60 rounded-xl mr-4">
                  <SiFlutter className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-bold">{pkg.name}</h3>
              </div>
              
              <p className="text-muted-foreground text-sm mb-6 flex-grow">
                {pkg.description}
              </p>
              
              <div className="flex mt-auto">
                <a 
                  href={pkg.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mr-3 p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-colors duration-300"
                  aria-label={`View ${pkg.name} on GitHub`}
                >
                  <FaGithub className="text-lg" />
                </a>
                <a 
                  href={pkg.pub} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-colors duration-300"
                  aria-label={`View ${pkg.name} on pub.dev`}
                >
                  <FaExternalLinkAlt className="text-sm" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Package details modal */}
      <AnimatePresence>
        {selectedPackage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 sm:p-6 md:p-10"
            onClick={closePackageDetails}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-background p-6 rounded-xl w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-primary to-primary/60 rounded-xl mr-5">
                  <SiFlutter className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{FLUTTER_PACKAGES[selectedPackage].name}</h3>
                  <div className="flex items-center mt-1 text-amber-400">
                    <FaStar className="mr-1" />
                    <span className="text-muted-foreground text-sm">{FLUTTER_PACKAGES[selectedPackage].stars} stars on GitHub</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6 text-muted-foreground">
                <p className="text-lg">{FLUTTER_PACKAGES[selectedPackage].description}</p>
              </div>
              
              <div className="flex space-x-4">
                <a 
                  href={FLUTTER_PACKAGES[selectedPackage].github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-muted hover:bg-primary/10 text-primary rounded-lg transition-colors duration-300"
                >
                  <FaGithub className="mr-2" />
                  View on GitHub
                </a>
                <a 
                  href={FLUTTER_PACKAGES[selectedPackage].pub} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-muted hover:bg-primary/10 text-primary rounded-lg transition-colors duration-300"
                >
                  <FaExternalLinkAlt className="mr-2" />
                  View on pub.dev
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}