// src/pages/Home.jsx
import { HeroSection } from '../components/home/HeroSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { HowItWorks } from '../components/home/HowItWorks';
import { ChatbotSection } from '../components/home/ChatbotSection';

export const Home = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <HowItWorks />
      <ChatbotSection />
    </div>
  );
};