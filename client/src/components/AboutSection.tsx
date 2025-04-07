import { motion } from 'framer-motion';
import { PERSONAL_DETAILS, STATS } from '@/lib/constants';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaMediumM } from 'react-icons/fa';

type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
};

export default function AboutSection() {
  // Flutter experience timeline
  const experiences: Experience[] = [
    {
      title: "Google Developer Expert",
      company: "Google",
      period: "2022 - Present",
      description: "Recognized as Google Developer Expert for Dart, Flutter, and Firebase. Contributing to Flutter community through blogs, talks, and mentorship."
    },
    {
      title: "Senior Flutter Developer",
      company: "Freelance & Consulting",
      period: "2019 - Present",
      description: "Working with clients worldwide to develop high-quality Flutter applications. Specializing in app and website development with Flutter and Firebase."
    },
    {
      title: "Flutter Developer",
      company: "Various Companies",
      period: "2018 - 2022",
      description: "Started journey with Flutter from its early days. Developed multiple applications across various domains including e-commerce, healthcare, and education."
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
                {PERSONAL_DETAILS.about}
              </p>
              <p>
                <span className="font-semibold">Have an app idea?</span> Let's get it done!
              </p>
              <p>
                You can also follow me here:
              </p>
              <div className="flex space-x-4 mt-3">
                <a href="https://github.com/AbhishekDoshi26" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary text-xl transition-colors">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/abhishekdoshi26/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary text-xl transition-colors">
                  <FaLinkedin />
                </a>
                <a href="https://twitter.com/AbhishekDoshi26" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary text-xl transition-colors">
                  <FaTwitter />
                </a>
                <a href="https://www.instagram.com/abhishekdoshi26/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary text-xl transition-colors">
                  <FaInstagram />
                </a>
                <a href="https://abhishekdoshi26.medium.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary text-xl transition-colors">
                  <FaMediumM />
                </a>
              </div>
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

            {/* Stats counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
              {STATS.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
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
