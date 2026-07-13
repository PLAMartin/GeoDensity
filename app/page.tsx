import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import Methodology from "@/components/Methodology";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div id="top" className="flex flex-1 flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <HowItWorks />
        <UseCases />
        <Methodology />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
