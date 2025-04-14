import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaShareAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaDownload,
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
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="w-full px-4 sm:px-6 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-6"
        >
          Get In <span className="text-gradient">Touch</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-12"
        >
          Whether you have a question or just want to say hi, I'll do my best to
          get back to you!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-2/3 mx-auto"
        >
          <div className="bg-muted p-6 rounded-xl h-full">
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:gap-x-6"
            >
              <motion.div
                variants={item}
                className="flex items-start mb-6 md:mb-0 md:w-1/3"
              >
                <div className="bg-primary/20 p-3 rounded-lg mr-4">
                  <FaMapMarkerAlt className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-muted-foreground">India</p>
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="flex items-start mb-6 md:mb-0 md:w-1/3"
              >
                <div className="bg-primary/20 p-3 rounded-lg mr-4">
                  <FaEnvelope className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <a
                    href="mailto:adoshi26.ad@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    adoshi26.ad@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div variants={item} className="flex items-start md:w-1/3">
                <div className="bg-primary/20 p-3 rounded-lg mr-4">
                  <FaShareAlt className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Social Profiles</h4>
                  <div className="flex mt-2 space-x-4">
                    <a
                      href="/github"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      aria-label="GitHub"
                    >
                      <FaGithub className="text-xl" />
                    </a>
                    <a
                      href="/linkedin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="text-xl" />
                    </a>
                    <a
                      href="/twitter"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      aria-label="Twitter"
                    >
                      <FaTwitter className="text-xl" />
                    </a>
                    <a
                      href="/instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      aria-label="Instagram"
                    >
                      <FaInstagram className="text-xl" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8"
            >
              <a
                href="#"
                className="inline-block bg-transparent hover:bg-primary/10 text-primary font-semibold py-3 px-6 border border-primary rounded-lg transition-all duration-300 w-full text-center"
              >
                Download Resume
                <FaDownload className="ml-2 inline" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
