import { motion } from "framer-motion";
import {
  FaCode,
  FaServer,
  FaPaintBrush,
  FaMobileAlt,
  FaTools,
  FaGraduationCap,
} from "react-icons/fa";
import { AppSkills, AppSkillCategories } from "@/lib/constants";

const iconMap: Record<string, JSX.Element> = {
  FaCode: <FaCode />,
  FaServer: <FaServer />,
  FaPaintBrush: <FaPaintBrush />,
  FaMobileAlt: <FaMobileAlt />,
  FaTools: <FaTools />,
  FaGraduationCap: <FaGraduationCap />,
};

export default function SkillsSection() {
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
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <section id="skills" className="py-32 md:py-48 bg-background relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
              Technical <span className="text-gradient-primary">Mastery</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A comprehensive suite of tools and technologies honed over 7+ years of
              professional development, research, and global community leadership.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {AppSkillCategories.categories.map((category, index) => (
            <motion.div
              key={index}
              variants={item}
              className="glass-card p-10 group hover:bg-accent/40 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary text-2xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary/5">
                {iconMap[category.icon]}
              </div>
              <h3 className="text-2xl font-bold mb-8 tracking-tight text-foreground group-hover:text-primary transition-colors">
                {category.title}
              </h3>
              <ul className="space-y-5">
                {category.skills.map((skill, sIndex) => (
                  <li
                    key={sIndex}
                    className="flex items-center gap-4 text-muted-foreground group-hover:text-foreground transition-all duration-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-all duration-300" />
                    <span className="text-sm font-medium tracking-wide">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Skills Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
          className="mt-32 p-12 md:p-20 rounded-[3rem] glass border-border/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          <div className="relative z-10 text-center">
            <h3 className="text-3xl font-bold mb-10 text-foreground tracking-tight">Core Specialization</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {AppSkills.skills.map((skill, i) => (
                <div
                  key={i}
                  className="px-8 py-4 rounded-2xl bg-accent/50 border border-border font-bold text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all duration-500 cursor-default"
                >
                  {skill.title}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
