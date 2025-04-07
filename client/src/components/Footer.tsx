import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

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
            <a href="#" className="text-2xl font-bold text-white">
              Abhishek<span className="text-primary">.dev</span>
            </a>
            <p className="text-muted-foreground mt-2">Crafting digital experiences with code</p>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6 md:mb-0">
            {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
              <a 
                key={item}
                href={`#${item}`}
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item);
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </nav>
          
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label="GitHub">
              <FaGithub className="text-xl" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label="LinkedIn">
              <FaLinkedin className="text-xl" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label="Twitter">
              <FaTwitter className="text-xl" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label="Email">
              <FaEnvelope className="text-xl" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-primary/10 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Abhishek Doshi. All Rights Reserved.</p>
          <p className="mt-1">
            Built with <span className="text-primary">❤</span> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
