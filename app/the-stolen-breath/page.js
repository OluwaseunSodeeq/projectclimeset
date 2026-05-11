// import StatsSection from "../components/BookHerosection";

import { getStolenBreathStats } from "../../lib/getStolenBreathStats";
import BookHerosection from "../components/BookHerosection";
import Wrapper from "../components/Wrapper";

export default async function Page() {
  const stats = await getStolenBreathStats();

  return (
    <Wrapper bg="#ffffff">
      <section className="md:mx-[1.5rem] xl:mx-[3.5rem] font-satoshi">
        <BookHerosection bookStats={stats} />
      </section>
    </Wrapper>
  );
}
