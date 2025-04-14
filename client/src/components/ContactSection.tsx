import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaPhone, 
  FaShareAlt, 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaDownload 
} from 'react-icons/fa';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema)
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out, I'll get back to you soon.",
        variant: "default",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

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
        duration: 0.5
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
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
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll do my best to get back to you!
        </motion.p>
        
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  {...register('name')}
                  className={`w-full px-4 py-3 bg-muted border ${errors.name ? 'border-destructive' : 'border-primary/30 focus:border-primary'} rounded-lg text-white outline-none transition-colors duration-300`}
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  {...register('email')}
                  className={`w-full px-4 py-3 bg-muted border ${errors.email ? 'border-destructive' : 'border-primary/30 focus:border-primary'} rounded-lg text-white outline-none transition-colors duration-300`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  {...register('subject')}
                  className={`w-full px-4 py-3 bg-muted border ${errors.subject ? 'border-destructive' : 'border-primary/30 focus:border-primary'} rounded-lg text-white outline-none transition-colors duration-300`}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-destructive">{errors.subject.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">Message</label>
                <textarea 
                  id="message" 
                  {...register('message')}
                  rows={5}
                  className={`w-full px-4 py-3 bg-muted border ${errors.message ? 'border-destructive' : 'border-primary/30 focus:border-primary'} rounded-lg text-white outline-none transition-colors duration-300 resize-none`}
                  placeholder="Your message here..."
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>
              
              <button 
                type="submit" 
                disabled={contactMutation.isPending}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 flex justify-center items-center"
              >
                {contactMutation.isPending ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : null}
                Send Message
              </button>
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2"
          >
            <div className="bg-muted p-6 rounded-xl h-full">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <motion.div variants={item} className="flex items-start">
                  <div className="bg-primary/20 p-3 rounded-lg mr-4">
                    <FaMapMarkerAlt className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-muted-foreground">Mumbai, Maharashtra, India</p>
                  </div>
                </motion.div>
                
                <motion.div variants={item} className="flex items-start">
                  <div className="bg-primary/20 p-3 rounded-lg mr-4">
                    <FaEnvelope className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <a href="mailto:hello@abhishekdoshi.dev" className="text-muted-foreground hover:text-primary transition-colors duration-300">hello@abhishekdoshi.dev</a>
                  </div>
                </motion.div>
                
                <motion.div variants={item} className="flex items-start">
                  <div className="bg-primary/20 p-3 rounded-lg mr-4">
                    <FaPhone className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <a href="tel:+919876543210" className="text-muted-foreground hover:text-primary transition-colors duration-300">+91 98765 43210</a>
                  </div>
                </motion.div>
                
                <motion.div variants={item} className="flex items-start">
                  <div className="bg-primary/20 p-3 rounded-lg mr-4">
                    <FaShareAlt className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Social Profiles</h4>
                    <div className="flex mt-2 space-x-4">
                      <a href="/github" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label="GitHub">
                        <FaGithub className="text-xl" />
                      </a>
                      <a href="/linkedin" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label="LinkedIn">
                        <FaLinkedin className="text-xl" />
                      </a>
                      <a href="/twitter" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label="Twitter">
                        <FaTwitter className="text-xl" />
                      </a>
                      <a href="/instagram" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label="Instagram">
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
                <a href="#" className="inline-block bg-transparent hover:bg-primary/10 text-primary font-semibold py-3 px-6 border border-primary rounded-lg transition-all duration-300 w-full text-center">
                  Download Resume
                  <FaDownload className="ml-2 inline" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
