import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaInstagram, FaMediumM, FaCalendarAlt } from 'react-icons/fa';
import { NAV_LINKS, SOCIAL_LINKS, PERSONAL_DETAILS } from '@/lib/constants';

export default function Footer() {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="py-8 bg-muted border-t border-primary/20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-2xl font-bold">
              <span className="text-gradient">Abhishek</span>
            </a>
            <p className="text-muted-foreground mt-2">Google Developer Expert for Dart, Flutter & Firebase</p>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6 md:mb-0">
            {NAV_LINKS.map((link) => {
              const id = link.path.substring(1);
              return (
                <a 
                  key={id}
                  href={link.path}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(id);
                  }}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
          
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <a 
              href={SOCIAL_LINKS.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300" 
              aria-label="GitHub"
            >
              <FaGithub className="text-xl" />
            </a>
            <a 
              href={SOCIAL_LINKS.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300" 
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-xl" />
            </a>
            <a 
              href={SOCIAL_LINKS.twitter} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300" 
              aria-label="Twitter"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a 
              href={SOCIAL_LINKS.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300" 
              aria-label="Instagram"
            >
              <FaInstagram className="text-xl" />
            </a>
            <a 
              href={SOCIAL_LINKS.medium} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300" 
              aria-label="Medium"
            >
              <FaMediumM className="text-xl" />
            </a>
            <a 
              href={SOCIAL_LINKS.email} 
              className="text-muted-foreground hover:text-primary transition-colors duration-300" 
              aria-label="Email"
            >
              <FaEnvelope className="text-xl" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-primary/10 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} {PERSONAL_DETAILS.name}. All Rights Reserved.</p>
          <p className="mt-1">
            Built with <span className="text-primary">❤</span> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
