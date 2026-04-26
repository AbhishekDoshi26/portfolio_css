import { motion } from "framer-motion";
import { AppPersonalDetails, AppStats } from "@/lib/constants";
import {
  FaCode,
  FaMobile,
  FaCloud,
  FaUsers,
  FaQuoteLeft,
} from "react-icons/fa";

type Service = {
  title: string;
  icon: JSX.Element;
  description: string;
};

export default function AboutSection() {
  const services: Service[] = [
    {
      title: "Flutter Development",
      icon: <FaCode className="text-3xl" />,
      description: "Building cross-platform mobile, web, and desktop apps with premium performance.",
    },
    {
      title: "Backend Architecture",
      icon: <FaCloud className="text-3xl" />,
      description: "Designing scalable cloud infrastructures and real-time database integrations.",
    },
    {
      title: "App Optimization",
      icon: <FaMobile className="text-3xl" />,
      description: "Performance engineering and smooth 120fps motion design for high-end devices.",
    },
    {
      title: "Product Strategy",
      icon: <FaUsers className="text-3xl" />,
      description: "Advising startups and enterprises on mobile roadmaps and technical architecture.",
    },
  ];

  const itemVariants = {
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

  return (
    <section id="about" className="py-32 md:py-48 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            The <span className="text-gradient-primary">Craftsman</span> behind the code
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-xl leading-relaxed">
            A decade of pushing the boundaries of mobile experiences, one pixel at a time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main About Card */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-8 glass-card p-10 md:p-16 flex flex-col justify-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-12 text-primary/5 group-hover:text-primary/10 transition-colors duration-700">
              <FaQuoteLeft className="text-[12rem] -rotate-12" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 mb-10 px-4 py-2 rounded-full bg-accent/50 border border-border">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">Who I Am</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-10 leading-[1.3] tracking-tight text-foreground">
                {AppPersonalDetails.intro}
              </h3>

              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-12 max-w-3xl">
                {AppPersonalDetails.about}
              </p>

              <div className="flex items-center gap-6 pt-10 border-t border-border/50">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]">
                  <span className="text-primary font-bold text-lg">AD</span>
                </div>
                <div>
                  <p className="font-bold text-xl text-foreground">{AppPersonalDetails.fullName}</p>
                  <p className="text-primary/80 font-bold tracking-widest text-xs uppercase">{AppPersonalDetails.position}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Column */}
          <div className="lg:col-span-4 grid gap-8">
            {AppStats.stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-10 flex flex-col items-center justify-center text-center group hover:bg-accent/40 transition-colors"
              >
                <div className="text-5xl md:text-6xl font-bold text-gradient-primary mb-4 group-hover:scale-110 transition-transform duration-500">
                  {stat.number}+
                </div>
                <div className="text-muted-foreground font-bold tracking-[0.3em] uppercase text-[10px]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Services Grid (Wide) */}
          <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-10 flex flex-col gap-8 group hover:bg-accent/40 transition-all"
              >
                <div className="w-16 h-16 rounded-3xl bg-accent/50 flex items-center justify-center border border-border group-hover:bg-primary/20 group-hover:border-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 text-primary">
                  {service.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{service.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
