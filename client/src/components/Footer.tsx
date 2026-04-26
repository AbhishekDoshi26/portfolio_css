import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaInstagram, FaMediumM } from "react-icons/fa";
import { AppNavLinks, AppSocialLinks, AppPersonalDetails } from "@/lib/constants";

export default function Footer() {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const socialLinks = [
    { icon: <FaGithub />, link: AppSocialLinks.github, label: "GitHub" },
    { icon: <FaLinkedin />, link: AppSocialLinks.linkedin, label: "LinkedIn" },
    { icon: <FaTwitter />, link: AppSocialLinks.twitter, label: "Twitter" },
    { icon: <FaInstagram />, link: AppSocialLinks.instagram, label: "Instagram" },
    { icon: <FaMediumM />, link: AppSocialLinks.medium, label: "Medium" },
    { icon: <FaEnvelope />, link: `mailto:${AppPersonalDetails.email}`, label: "Email" },
  ];

  return (
    <footer className="py-24 relative overflow-hidden border-t border-border bg-background/50 backdrop-blur-3xl">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <div className="mb-16 text-center">
            <h3 className="text-3xl font-bold tracking-tight mb-4">
              <span className="text-gradient-primary">{AppPersonalDetails.fullName}</span>
            </h3>
            <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase max-w-xs mx-auto leading-relaxed">
              {AppPersonalDetails.position}
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-16">
            {AppNavLinks.links.map((link) => {
              const id = link.path.substring(1);
              return (
                <a
                  key={id}
                  href={link.path}
                  className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 hover:text-primary transition-all duration-300"
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

          <div className="flex gap-10 mb-16">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-muted-foreground/60 hover:text-primary transition-all duration-500 hover:-translate-y-1"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="pt-12 border-t border-border/50 w-full text-center">
            <p className="text-[10px] font-bold text-muted-foreground/60 tracking-[0.3em] uppercase">
              &copy; {new Date().getFullYear()} • Engineered by {AppPersonalDetails.fullName} • All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
