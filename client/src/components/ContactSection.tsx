import { AppPersonalDetails, AppSocialLinks } from "@/lib/constants";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaDownload,
  FaArrowRight,
  FaPaperPlane,
} from "react-icons/fa";

export default function ContactSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
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

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value: "India",
      link: null,
    },
    {
      icon: <FaEnvelope />,
      label: "Direct Email",
      value: AppPersonalDetails.email,
      link: `mailto:${AppPersonalDetails.email}`,
    },
  ];

  const socialIcons = [
    { icon: <FaGithub />, link: AppSocialLinks.github, label: "GitHub" },
    { icon: <FaLinkedin />, link: AppSocialLinks.linkedin, label: "LinkedIn" },
    { icon: <FaTwitter />, link: AppSocialLinks.twitter, label: "Twitter" },
    { icon: <FaInstagram />, link: AppSocialLinks.instagram, label: "Instagram" },
  ];

  return (
    <section id="contact" className="py-32 md:py-48 relative overflow-hidden bg-accent/20">
      {/* Decorative Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-primary/5 rounded-full blur-[160px] pointer-events-none -mb-96" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-8">
            <FaPaperPlane className="animate-bounce" />
            Connect
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
            Let's Start a <span className="text-gradient-primary">Conversation.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-xl leading-relaxed">
            Whether you have a revolutionary idea or an enterprise-scale challenge,
            I'm ready to help you build the future of mobile experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto">
          {/* Contact Methods */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={item}
                className="glass-card p-10 flex items-center gap-8 group hover:bg-accent/40 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary text-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 shadow-lg shadow-primary/5">
                  {info.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">
                    {info.label}
                  </p>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-xl md:text-2xl font-bold text-foreground hover:text-primary transition-colors tracking-tight"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-xl md:text-2xl font-bold text-foreground tracking-tight">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            <motion.div
              variants={item}
              className="glass-card p-10 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <FaLinkedin size={120} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-8">
                Network & Community
              </p>
              <div className="flex gap-6">
                {socialIcons.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-2xl bg-accent/50 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-primary/20 border border-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
                    aria-label={social.label}
                  >
                    <span className="text-2xl">{social.icon}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Call to Action Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 30 }}
            className="lg:col-span-7 glass-card p-12 md:p-20 flex flex-col justify-center relative overflow-hidden border-primary/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-30" />

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight text-foreground">Looking for an Expert Consultant?</h3>
              <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-xl leading-relaxed">
                Download my comprehensive technical portfolio or reach out directly
                to discuss architecture reviews, performance optimization, or full-stack Flutter builds.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <a
                  href={AppPersonalDetails.cv_url}
                  className="apple-button-primary flex items-center justify-center gap-4 group"
                >
                  <FaDownload size={18} className="group-hover:-translate-y-1 transition-transform" />
                  <span className="font-bold">Technical Resume</span>
                </a>
                <a
                  href={`mailto:${AppPersonalDetails.email}`}
                  className="apple-button-secondary flex items-center justify-center gap-4 group"
                >
                  <span className="font-bold">Quick Message</span>
                  <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
