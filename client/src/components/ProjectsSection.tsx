import { motion } from 'framer-motion';
import { FaGithub, FaArrowRight } from 'react-icons/fa';

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  projectLink: string;
  githubLink: string;
};

export default function ProjectsSection() {
  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with product catalog, cart, checkout, and payment processing.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23121212'/%3E%3Cpath d='M30,30 L70,30 L70,70 L30,70 Z' stroke='%2310B981' fill='none' stroke-width='2'/%3E%3Ccircle cx='50' cy='50' r='10' fill='%2310B981' opacity='0.3'/%3E%3C/svg%3E",
      tags: ["React", "Next.js", "Stripe", "Tailwind"],
      projectLink: "#",
      githubLink: "#"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A Kanban-style task management application with drag-and-drop functionality and team collaboration.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23121212'/%3E%3Crect x='20' y='20' width='60' height='20' rx='2' fill='%2310B981' opacity='0.3'/%3E%3Crect x='20' y='45' width='60' height='20' rx='2' fill='%233B82F6' opacity='0.3'/%3E%3Crect x='20' y='70' width='60' height='10' rx='2' fill='%2310B981' opacity='0.2'/%3E%3C/svg%3E",
      tags: ["React", "Redux", "Firebase", "dnd-kit"],
      projectLink: "#",
      githubLink: "#"
    },
    {
      id: 3,
      title: "Health & Fitness Tracker",
      description: "A comprehensive health and fitness tracking application with workout plans, nutrition tracking, and progress visualization.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23121212'/%3E%3Cpath d='M20,70 L40,50 L60,60 L80,30' stroke='%2310B981' fill='none' stroke-width='2'/%3E%3Ccircle cx='20' cy='70' r='3' fill='%2310B981'/%3E%3Ccircle cx='40' cy='50' r='3' fill='%2310B981'/%3E%3Ccircle cx='60' cy='60' r='3' fill='%2310B981'/%3E%3Ccircle cx='80' cy='30' r='3' fill='%2310B981'/%3E%3C/svg%3E",
      tags: ["React Native", "GraphQL", "Chart.js", "AWS"],
      projectLink: "#",
      githubLink: "#"
    },
    {
      id: 4,
      title: "Financial Dashboard",
      description: "A comprehensive financial dashboard with expense tracking, budget planning, and investment analysis.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23121212'/%3E%3Ccircle cx='50' cy='50' r='30' fill='none' stroke='%2310B981' stroke-width='2'/%3E%3Cpath d='M50,30 L50,50 L65,65' stroke='%233B82F6' fill='none' stroke-width='2'/%3E%3Ccircle cx='50' cy='50' r='3' fill='%233B82F6'/%3E%3C/svg%3E",
      tags: ["React", "TypeScript", "D3.js", "Firebase"],
      projectLink: "#",
      githubLink: "#"
    }
  ];

  const tagColors: Record<string, string> = {
    "React": "bg-primary/20 text-primary",
    "Next.js": "bg-blue-500/20 text-blue-500",
    "Stripe": "bg-purple-500/20 text-purple-500",
    "Tailwind": "bg-green-500/20 text-green-500",
    "Redux": "bg-yellow-500/20 text-yellow-500",
    "Firebase": "bg-pink-500/20 text-pink-500",
    "dnd-kit": "bg-blue-500/20 text-blue-500",
    "React Native": "bg-primary/20 text-primary",
    "GraphQL": "bg-purple-500/20 text-purple-500",
    "Chart.js": "bg-blue-500/20 text-blue-500",
    "AWS": "bg-orange-500/20 text-orange-500",
    "TypeScript": "bg-blue-500/20 text-blue-500",
    "D3.js": "bg-purple-500/20 text-purple-500",
  };

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
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-6"
        >
          My <span className="text-gradient">Projects</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-12"
        >
          Here are some of my recent projects. I've worked on a variety of applications ranging from simple landing pages to complex web applications.
        </motion.p>
        
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              className="project-card bg-muted rounded-xl overflow-hidden transition-all duration-300"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
            >
              <div className="relative h-48">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${project.image}")`,
                    backgroundColor: "#1F2937"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${tagColors[tag] || 'bg-gray-500/20 text-gray-500'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <a href={project.projectLink} className="text-primary hover:text-primary/80 transition-colors duration-300 flex items-center">
                    <span>View Project</span>
                    <FaArrowRight className="h-4 w-4 ml-1" />
                  </a>
                  <a href={project.githubLink} className="text-muted-foreground hover:text-white transition-colors duration-300">
                    <FaGithub className="text-xl" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a href="#" className="inline-flex items-center bg-transparent hover:bg-muted text-white font-semibold py-3 px-8 border border-primary rounded-lg transition-all duration-300">
            View All Projects
            <FaArrowRight className="h-4 w-4 ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
