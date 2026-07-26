import BuiltForStudents from "@/components/landing/BuiltForStudents";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BuiltForStudents />
      <Features />
    </>
  );
}