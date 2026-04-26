import { ReactNode, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [location] = useLocation();

  useEffect(() => {
    // Handle initial scroll on page load or deep link
    if (location !== "/") {
      const sectionId = location.substring(1);
      // Wait for components to mount and images to potentially layout
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="font-sans overflow-x-hidden bg-background text-foreground min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}
