import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import AISection from "@/components/landing/AISection";
import BuiltForStudents from "@/components/landing/BuiltForStudents";
import Security from "@/components/landing/Security";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F0FDF4]">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <AISection />
      <BuiltForStudents />
      <Security />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}