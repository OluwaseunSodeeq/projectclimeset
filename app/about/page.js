import React from "react";
import AboutHeroSection from "../components/AboutHeroSection";
import Wrapper from "../components/Wrapper";
import MeetTheTeamImages from "../components/MeetTheTeamImages";

// Initial Ui ideas
// import MeetTheTeam from "../components/MeetTheTeam";
// import AboutCards from "../components/AboutCards";

export default function Page() {
  return (
    <Wrapper>
      <div className="md:px-[1.5rem] xl:px-[3.5rem] font-satoshi">
        <AboutHeroSection />
        {/* <AboutCards /> */}
        <MeetTheTeamImages />
      </div>
    </Wrapper>
  );
}
