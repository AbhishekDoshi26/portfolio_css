import { motion } from 'framer-motion';
import { BLOG_POSTS } from '@/lib/constants';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

export default function BlogSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Function to get the appropriate tag styling based on category
  const getCategoryStyle = (category: string) => {
    switch(category) {
      case 'flutter':
        return 'bg-primary/20 text-primary';
      case 'firebase':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'dart':
        return 'bg-blue-500/20 text-blue-500';
      case 'animations':
        return 'bg-purple-500/20 text-purple-500';
      case 'state-management':
        return 'bg-green-500/20 text-green-500';
      case 'web':
        return 'bg-orange-500/20 text-orange-500';
      default:
        return 'bg-primary/20 text-primary';
    }
  };

  return (
    <section id="blog" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-3"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">my blog</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-center mb-3"
        >
          Some Recent Blogs <span className="text-gradient">That You Might Like!</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-12"
        >
          Writing Blogs is a way of sharing knowledge and experience with the world.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {BLOG_POSTS.slice(0, 6).map((post, index) => (
            <motion.div 
              key={index} 
              variants={item}
              className="bg-background rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback if image doesn't load
                      const target = e.target as HTMLImageElement;
                      target.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                    }}
                  />
                  <div className="absolute bottom-0 left-0 p-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryStyle(post.category)}`}>
                      {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <FaCalendarAlt className="mr-2" />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 line-clamp-2 hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-primary mt-4 text-sm font-medium">
                    <span>Read Article</span>
                    <FaArrowRight className="ml-2 hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center mt-12"
        >
          <a 
            href="https://medium.com/@abhishekdoshi26" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-md bg-primary text-white hover:bg-primary/90 font-medium inline-flex items-center transition-colors"
          >
            <span>View All Articles</span>
            <FaArrowRight className="ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}