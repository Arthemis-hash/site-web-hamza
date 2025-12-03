// src/pages/Home.jsx
import { HeroSection } from '../components/home/HeroSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { HowItWorks } from '../components/home/HowItWorks';
import { ChatbotSection } from '../components/home/ChatbotSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { PartnersSection } from '../components/home/PartnersSection';

export const Home = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <HowItWorks />
      <TestimonialsSection />
      <PartnersSection />
      <ChatbotSection />
    </div>
  );
};