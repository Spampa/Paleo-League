'use client';

import React from "react";
import { useState, useEffect, Fragment } from "react";
import Header from "@components/header";
import MatchCard from "@/components/card/matchCard";
import MainMatch from "@/components/banner/mainMatch";

import { getAllMatches, getLiveMatches } from "@/services/matchService";

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);

  useEffect(() => {
    if(!localStorage.getItem('user')){
      window.location.href = '/auth/login';
    }
  }, []);

  useEffect(() => {
    getAllMatches()
      .then((data) => setMatches(data))
      .catch((err) => setMatches([]));
    getLiveMatches()
      .then((data) => setLiveMatches(data))
      .catch((err) => setLiveMatches([]));
  }, []);

  return (
    <Fragment>
      <Header />
      <div className="container  p-3 flex flex-col gap-1">
        <h4 className="text-amber-400">Partite di oggi:</h4>
        {
          liveMatches.length === 0 ? <h4 className="text-amber-400 font-semibold text-center">Nessuna partita in corso</h4> : <MainMatch match={liveMatches[0]} />
        }
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1">
          {matches.map((match) => (
            <MatchCard key={match.matchId} match={match} />
          ))}
        </div>

      </div>
    </Fragment>
  );
}