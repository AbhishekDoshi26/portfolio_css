import { motion } from "framer-motion";
import { PERSONAL_DETAILS, STATS } from "@/lib/constants";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaMediumM,
  FaCode,
  FaBook,
  FaMobile,
  FaCloud,
  FaUsers,
} from "react-icons/fa";

type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
};

type Service = {
  title: string;
  icon: JSX.Element;
  description: string;
};

export default function AboutSection() {
  // Flutter experience timeline
  const experiences: Experience[] = [
    {
      title: "Google Developer Expert",
      company: "Google",
      period: "2021 - Present",
      description:
        "Recognized as Google Developer Expert (GDE) for Dart, Flutter, and Firebase. Actively contributing to the Flutter ecosystem through technical blogs, conference talks, and mentorship programs. Helping companies and developers adopt Flutter best practices.",
    },
    {
      title: "Senior Flutter Developer",
      company: "Freelance & Consulting",
      period: "2021 - Present",
      description:
        "Working with clients globally to develop high-performance Flutter applications. Specializing in complex app architecture, state management solutions, and cross-platform development. Delivered over 40 successful projects with exceptional client satisfaction.",
    },
    {
      title: "Flutter Developer",
      company: "Various Companies",
      period: "2018 - 2021",
      description:
        "Started my journey with Flutter from its early days. Developed applications across diverse domains including e-commerce, healthcare, education, and fintech. Built a strong foundation in mobile app development and contributed to open source Flutter packages.",
    },
  ];

  // Services offered
  const services: Service[] = [
    {
      title: "Flutter Development",
      icon: <FaCode className="text-primary text-3xl" />,
      description:
        "Expert Flutter development for mobile, web, and desktop applications with clean architecture and robust state management.",
    },
    {
      title: "Firebase Integration",
      icon: <FaCloud className="text-primary text-3xl" />,
      description:
        "Seamless integration of Firebase services including Authentication, Firestore, Cloud Functions, and Analytics for scalable backends.",
    },
    {
      title: "App Optimization",
      icon: <FaMobile className="text-primary text-3xl" />,
      description:
        "Performance optimization for Flutter apps, ensuring smooth animations, reduced build size, and efficient resource usage.",
    },
    {
      title: "Technical Consultation",
      icon: <FaUsers className="text-primary text-3xl" />,
      description:
        "Strategic guidance on app architecture, technology choices, and development workflows for teams adopting Flutter.",
    },
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

        <div className="flex flex-col md:flex-row md:space-x-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2 mb-8 md:mb-0"
          >
            <div className="bg-background p-6 rounded-xl shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <FaBook className="mr-2 text-primary" /> Who am I?
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">{PERSONAL_DETAILS.about}</p>
                <p className="leading-relaxed">
                  <span className="font-semibold text-white">
                    Have an app idea?
                  </span>{" "}
                  Let's transform it into reality with Flutter's power and
                  flexibility!
                </p>
                <p>Connect with me on social media:</p>
                <div className="flex space-x-5 mt-3">
                  <a
                    href="https://github.com/AbhishekDoshi26"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary text-xl transition-colors duration-300"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abhishekdoshi26/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary text-xl transition-colors duration-300"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://twitter.com/AbhishekDoshi26"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary text-xl transition-colors duration-300"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://www.instagram.com/abhishekdoshi26/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary text-xl transition-colors duration-300"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://abhishekdoshi26.medium.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary text-xl transition-colors duration-300"
                  >
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
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  Let's Talk
                </a>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2"
          >
            <div className="bg-background p-6 rounded-xl shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-6">My Journey</h3>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    className="flex group"
                  >
                    <div className="mr-4 flex-shrink-0">
                      <div className="w-4 h-4 rounded-full bg-primary mt-1 group-hover:scale-125 transition-transform duration-300"></div>
                      {index < experiences.length - 1 && (
                        <div className="w-0.5 h-full bg-primary/30 ml-2"></div>
                      )}
                    </div>
                    <div
                      className={index < experiences.length - 1 ? "pb-6" : ""}
                    >
                      <h4 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                        {exp.title}
                      </h4>
                      <p className="text-primary text-sm">
                        {exp.company} | {exp.period}
                      </p>
                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
              className="bg-background p-6 rounded-xl text-center shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-5xl font-bold text-gradient mb-2">
                {stat.number}+
              </div>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Services */}
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center mb-8"
        >
          Services I <span className="text-gradient">Offer</span>
        </motion.h3>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-background p-6 rounded-xl shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">{service.icon}</div>
              <h4 className="text-lg font-bold mb-2">{service.title}</h4>
              <p className="text-muted-foreground text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
