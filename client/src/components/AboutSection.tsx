import { motion } from 'framer-motion';

type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
};

export default function AboutSection() {
  const experiences: Experience[] = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Company",
      period: "2021 - Present",
      description: "Leading frontend development for multiple projects. Working with React, Next.js, and Tailwind CSS. Implementing responsive design principles and ensuring accessibility."
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency",
      period: "2019 - 2021",
      description: "Developed and maintained multiple client websites. Worked with JavaScript, React, and CSS frameworks. Collaborated with designers to implement pixel-perfect UIs."
    },
    {
      title: "UI/UX Designer",
      company: "Startup",
      period: "2018 - 2019",
      description: "Created user interfaces and experiences for web and mobile applications. Conducted user research and testing. Worked with Figma and Adobe Creative Suite."
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          About <span className="text-gradient">Me</span>
        </motion.h2>
        <div className="flex flex-col md:flex-row md:space-x-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2 mb-8 md:mb-0"
          >
            <h3 className="text-2xl font-bold mb-4">Who am I?</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm a passionate Frontend Developer from India with a strong eye for innovative design and a keen understanding of techniques geared toward optimum user experience.
              </p>
              <p>
                I enjoy turning complex problems into simple, beautiful and intuitive designs. When I'm not coding or pushing pixels, you'll find me cooking, reading, or exploring the outdoors.
              </p>
              <p>
                I am also passionate about creating accessible, user-friendly interfaces. I believe that good design should work for everyone, regardless of their abilities or the device they're using.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8"
            >
              <a
                href="#contact"
                className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                Let's Talk
              </a>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2"
          >
            <h3 className="text-2xl font-bold mb-4">My Journey</h3>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {experiences.map((exp, index) => (
                <motion.div key={index} variants={item} className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="w-4 h-4 rounded-full bg-primary mt-1"></div>
                    {index < experiences.length - 1 && (
                      <div className="w-0.5 h-full bg-primary/30 ml-2"></div>
                    )}
                  </div>
                  <div className={index < experiences.length - 1 ? "pb-6" : ""}>
                    <h4 className="text-lg font-semibold">{exp.title}</h4>
                    <p className="text-primary">{exp.company} | {exp.period}</p>
                    <p className="text-muted-foreground mt-2">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
