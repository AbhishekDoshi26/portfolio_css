import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PackagesSection from "@/components/PackagesSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-sans overflow-x-hidden bg-background text-foreground">
      <Header />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <TestimonialsSection />
      <PackagesSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
