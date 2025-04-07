import { motion } from 'framer-motion';
import { 
  FaCode, 
  FaServer, 
  FaPaintBrush, 
  FaMobileAlt, 
  FaTools, 
  FaGraduationCap 
} from 'react-icons/fa';

type SkillCategory = {
  id: number;
  title: string;
  icon: JSX.Element;
  skills: string[];
};

export default function SkillsSection() {
  const skillCategories: SkillCategory[] = [
    {
      id: 1,
      title: "Frontend Development",
      icon: <FaCode />,
      skills: [
        "HTML5, CSS3, JavaScript (ES6+)",
        "React, Next.js, Vue.js",
        "Tailwind CSS, SASS, Styled Components",
        "Redux, Context API, React Query",
        "TypeScript, GraphQL"
      ]
    },
    {
      id: 2,
      title: "Backend Development",
      icon: <FaServer />,
      skills: [
        "Node.js, Express.js",
        "RESTful APIs, GraphQL",
        "MongoDB, PostgreSQL",
        "Firebase, AWS",
        "Authentication, Authorization"
      ]
    },
    {
      id: 3,
      title: "UI/UX Design",
      icon: <FaPaintBrush />,
      skills: [
        "Figma, Adobe XD",
        "Responsive Web Design",
        "User Research & Testing",
        "Wireframing & Prototyping",
        "Design Systems"
      ]
    },
    {
      id: 4,
      title: "Mobile Development",
      icon: <FaMobileAlt />,
      skills: [
        "React Native",
        "Expo",
        "Native Modules",
        "iOS & Android Development",
        "Progressive Web Apps (PWA)"
      ]
    },
    {
      id: 5,
      title: "DevOps & Tools",
      icon: <FaTools />,
      skills: [
        "Git, GitHub, GitLab",
        "Docker, CI/CD",
        "Vercel, Netlify, Heroku",
        "Jest, Testing Library",
        "VS Code, Postman"
      ]
    },
    {
      id: 6,
      title: "Other Skills",
      icon: <FaGraduationCap />,
      skills: [
        "Agile/Scrum Methodology",
        "Technical Writing",
        "SEO & Analytics",
        "Accessibility (WCAG)",
        "Performance Optimization"
      ]
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <section id="skills" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-6"
        >
          My <span className="text-gradient">Skills</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-12"
        >
          I've worked with a variety of technologies in the web development world. Here are my main areas of expertise and the technologies I use regularly.
        </motion.p>
        
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={item}
              className="bg-background/50 p-6 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300"
            >
              <div className="text-primary text-3xl mb-4">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{category.title}</h3>
              <ul className="space-y-2 text-muted-foreground">
                {category.skills.map((skill, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-primary mr-2">▹</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
