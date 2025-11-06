import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import Differentials from "@/components/Differentials";
import Partnership from "@/components/Partnership";
import Footer from "@/components/Footer";
import FixedContact from "@/components/FixedContact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <Benefits />
        <Testimonials />
        <Stats />
        <Differentials />
        <Partnership />
      </main>
      <Footer />
      <FixedContact />
    </div>
  );
};

export default Index;
