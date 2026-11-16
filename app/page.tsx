import { About } from "@/components/About";
import { Cta, Footer } from "@/components/CtaFooter";
import { Faq } from "@/components/Faq";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Hero } from "@/components/Hero";
import { IssuePreview } from "@/components/IssuePreview";
import { MultiChannel } from "@/components/MultiChannel";
import { Navbar } from "@/components/Navbar";
import { ProblemSolution } from "@/components/ProblemSolution";
import { Team } from "@/components/Team";
import { TryItOut } from "@/components/TryItOut";
import { Trusted } from "@/components/Trusted";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <section id="features" className="overflow-x-clip bg-page">
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-0">
            <Features />
          </div>
        </section>
        <HowItWorks />
        <section className="overflow-x-clip bg-page">
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-0">
            <IssuePreview />
          </div>
        </section>
        <section id="try-it-out" className="overflow-x-clip bg-page">
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-0">
            <TryItOut />
          </div>
        </section>
        <MultiChannel />
        <Trusted />
        <About />
        <Team />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
