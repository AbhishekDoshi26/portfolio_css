import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import MainLayout from "@/components/MainLayout";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PackagesSection from "@/components/PackagesSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";

function Router() {
  return (
    <Switch>
      <Route path="/:section?">
        <MainLayout>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <TestimonialsSection />
          <PackagesSection />
          <BlogSection />
          <ContactSection />
        </MainLayout>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mesh-background" />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
