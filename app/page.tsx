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
        <section className="overflow-x-clip bg-page pb-4 pt-8 lg:pt-12">
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-0">
            <Features />
          </div>
        </section>
        <HowItWorks />
        <section className="overflow-x-clip bg-page pb-16 lg:pb-[80px]">
          <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-0">
            <IssuePreview />
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
