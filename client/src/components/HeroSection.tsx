import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaInstagram,
  FaMediumM,
  FaCalendarAlt,
} from "react-icons/fa";
import { AppPersonalDetails, AppSocialLinks } from "@/lib/constants";

export default function HeroSection() {
  const socialLinks = [
    { icon: <FaGithub />, url: AppSocialLinks.github, label: "GitHub" },
    { icon: <FaLinkedin />, url: AppSocialLinks.linkedin, label: "LinkedIn" },
    { icon: <FaTwitter />, url: AppSocialLinks.twitter, label: "Twitter" },
    { icon: <FaInstagram />, url: AppSocialLinks.instagram, label: "Instagram" },
    { icon: <FaMediumM />, url: AppSocialLinks.medium, label: "Medium" },
    { icon: <FaEnvelope />, url: AppSocialLinks.email, label: "Email" },
    { icon: <FaCalendarAlt />, url: AppSocialLinks.calendly, label: "Calendly" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 80,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-10 pb-20 overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 -left-24 w-[30rem] h-[30rem] bg-primary/10 blur-[160px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 -right-24 w-[30rem] h-[30rem] bg-secondary/10  blur-[160px] rounded-full animate-pulse delay-1000" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-5xl mx-auto text-center flex flex-col items-center"
        >
          <motion.div
            variants={item}
            className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass border-border/50"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-muted-foreground/80">
              {AppPersonalDetails.position}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.05]"
          >
            <span className="text-gradient block">
              {AppPersonalDetails.intro}
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-[1.6]"
          >
            {AppPersonalDetails.description}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-6 mb-12"
          >
            <a
              href={AppPersonalDetails.cv_url}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-button-primary"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="apple-button-secondary"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Get in Touch
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="flex items-center justify-center gap-8"
          >
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/60 hover:text-foreground transition-all duration-500 transform hover:scale-125 hover:rotate-6"
                aria-label={link.label}
              >
                <span className="text-2xl">{link.icon}</span>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
