import Wrapper from "../components/Wrapper";
import ProjectsSection from "../components/ProjectsSection";

export default function Page() {
  return (
    <Wrapper>
      <section className="md:px-[1.5rem] xl:px-[3.5rem] font-satoshi">
        <ProjectsSection />
      </section>
    </Wrapper>
  );
}
