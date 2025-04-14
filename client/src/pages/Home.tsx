import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PackagesSection from '@/components/PackagesSection';
import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="font-sans overflow-x-hidden">
      <Header />
      <HeroSection />
      <AboutSection />
      <TestimonialsSection />
      <PackagesSection />
      <BlogSection />
      <Footer />
    </div>
  );
}
