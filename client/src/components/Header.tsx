import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Update header style based on scroll position
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (
          scrollPosition >= sectionTop && 
          scrollPosition < sectionTop + sectionHeight &&
          sectionId
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    
    // Smooth scroll to section
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: (element as HTMLElement).offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const headerBg = scrolled ? 'bg-dark/90 shadow-lg backdrop-blur-lg' : 'bg-dark/80 backdrop-blur-lg';

  // Get section IDs from NAV_LINKS
  const navItems = NAV_LINKS.map(link => link.path.substring(1));

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerBg}`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.a 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            href="#"
            className="text-2xl font-bold"
            onClick={() => handleLinkClick('home')}
          >
            <span className="text-gradient">Abhishek</span>
          </motion.a>
          
          {/* Desktop Navigation */}
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-8"
          >
            {NAV_LINKS.map((link) => {
              const id = link.path.substring(1);
              return (
                <a
                  key={id}
                  href={link.path}
                  className={`nav-link text-white hover:text-primary transition-colors duration-300 ${
                    activeSection === id ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(id);
                  }}
                >
                  {link.name}
                </a>
              );
            })}
          </motion.nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-muted transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 py-4' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          {NAV_LINKS.map((link) => {
            const id = link.path.substring(1);
            return (
              <a
                key={id}
                href={link.path}
                className="text-white hover:text-primary transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(id);
                }}
              >
                {link.name}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}
