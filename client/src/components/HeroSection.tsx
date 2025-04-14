import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaChevronDown,
  FaInstagram,
  FaMediumM,
  FaCalendarAlt,
} from "react-icons/fa";
import { PERSONAL_DETAILS, SOCIAL_LINKS } from "@/lib/constants";

export default function HeroSection() {
  const typingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Adding typewriter effect class
    const element = typingRef.current;
    if (element) {
      element.style.borderRight = ".15em solid #10B981";
      element.style.whiteSpace = "nowrap";
      element.style.overflow = "hidden";
      element.animate([{ width: "0" }, { width: "100%" }], {
        duration: 3500,
        easing: "steps(30, end)",
        fill: "forwards",
      });

      // Blinking cursor animation
      let visible = true;
      const blinkCursor = setInterval(() => {
        visible = !visible;
        element.style.borderRightColor = visible ? "#10B981" : "transparent";
      }, 750);

      return () => {
        clearInterval(blinkCursor);
      };
    }
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const socialLinks = [
    { icon: <FaGithub />, url: "/github", label: "GitHub" },
    { icon: <FaLinkedin />, url: "/linkedin", label: "LinkedIn" },
    { icon: <FaTwitter />, url: "/twitter", label: "Twitter" },
    { icon: <FaInstagram />, url: "/instagram", label: "Instagram" },
    { icon: <FaMediumM />, url: "/medium", label: "Medium" },
    { icon: <FaEnvelope />, url: SOCIAL_LINKS.email, label: "Email" },
    { icon: <FaCalendarAlt />, url: "/calendly", label: "Calendly" },
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 mb-10 md:mb-0"
          >
            <div className="mb-4">
              <h1
                ref={typingRef}
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
              >
                <span className="text-gradient">{PERSONAL_DETAILS.intro}</span>
              </h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl text-white font-bold mb-6"
            >
              {PERSONAL_DETAILS.position}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-muted-foreground mb-8 max-w-lg"
            >
              {PERSONAL_DETAILS.description}
            </motion.p>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-4"
            >
              <motion.a
                variants={item}
                href={PERSONAL_DETAILS.cv_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
              >
                Download CV
              </motion.a>
              <motion.a
                variants={item}
                href="#contact"
                className="bg-transparent hover:bg-muted text-white font-semibold py-3 px-8 border border-primary rounded-lg transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Hire Me Now
              </motion.a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="flex mt-8 space-x-4 flex-wrap"
            >
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-2xl mr-2 mb-2"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg shadow-primary/20">
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-full"
              >
                <path
                  fill="currentColor"
                  className="text-primary/20"
                  d="M48.8,-61.9C61.9,-51.8,70.4,-35.7,73.8,-18.9C77.2,-2,75.5,15.4,68.3,30.5C61,45.7,48.2,58.5,33.2,66.2C18.1,73.9,0.9,76.5,-16.4,73.4C-33.7,70.3,-51.2,61.4,-63.7,47.6C-76.2,33.8,-83.8,15,-82.9,-3.5C-81.9,-22,-72.4,-40.3,-58.7,-50.7C-45,-61,-22.5,-63.4,-2.3,-60.7C17.9,-58,35.8,-72,48.8,-61.9Z"
                  transform="translate(100 100)"
                />
              </svg>
              <svg
                className="absolute inset-0 w-full h-full text-primary/30"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M37.2,-44.1C51.6,-31.9,68.8,-23.2,75.5,-8.9C82.2,5.4,78.4,25.2,67.3,37.9C56.3,50.6,38,56.2,21.5,59.8C5,63.3,-9.7,64.8,-26.3,61.4C-42.9,58,-61.4,49.7,-69.5,35.6C-77.6,21.5,-75.1,1.6,-70.8,-17.3C-66.6,-36.1,-60.6,-53.9,-47.8,-66.2C-35.1,-78.5,-17.5,-85.4,-3.3,-81.3C10.9,-77.2,21.9,-61.1,37.2,-44.1Z"
                  transform="translate(100 100)"
                />
              </svg>
              <svg
                className="absolute inset-0 w-full h-full text-primary/40"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M48.2,-46.1C63.1,-35.1,76.5,-17.5,77.1,0.7C77.8,18.9,65.8,37.7,50.8,48.9C35.7,60.1,17.9,63.6,0.4,63.2C-17,62.8,-34,58.4,-45.9,47.3C-57.8,36.1,-64.5,18.1,-65.6,-0.6C-66.7,-19.3,-62.1,-38.6,-50.2,-49.5C-38.3,-60.5,-19.2,-63.2,-0.9,-62.3C17.3,-61.4,34.6,-57,48.2,-46.1Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex justify-center mt-16"
        >
          <button
            onClick={handleScrollDown}
            className="scroll-down text-primary"
            aria-label="Scroll down"
          >
            <FaChevronDown className="text-3xl" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
