import React from "react";
import Header from "@components/header";
import MatchCard from "@/components/card/matchCard";
import MainMatch from "@/components/banner/mainMatch";

export default function Home() {
  return (
    <React.Fragment>
      <Header />
      <div className="container  p-3 flex flex-col gap-1">
        <h4 className="text-amber-400">Partite di oggi:</h4>
        <MainMatch />
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1">
          <MatchCard />
          <MatchCard />
        </div>
        
      </div>
    </React.Fragment>
  );
}