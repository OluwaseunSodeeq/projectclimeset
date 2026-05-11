import Wrapper from "../components/Wrapper";
import ImpactHeroSection from "../components/ImpactHeroSection";

export default function Page() {
  return (
    <Wrapper>
      <section className="md:px-[1.5rem] xl:px-[3.5rem] font-satoshi">
        <ImpactHeroSection />
      </section>
    </Wrapper>
  );
}
