import BuiltForStudents from "@/components/landing/BuiltForStudents";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/shared/Navbar";
import Security from "@/components/landing/Security";
import AISection from "@/components/landing/AISection";
import FAQ from "@/components/landing/FAQ";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BuiltForStudents />
      <Features />
      <HowItWorks />
      <Security />
      <AISection />
      <FAQ />
    </>
  );
}