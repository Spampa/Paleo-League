'use server';

import axios from 'axios';

export async function getAllMatches(){
    try{
        const response = await axios.get('http://localhost:3030/api/v1/matches');
        return response.data;
    }
    catch(err){
        throw err;
    }
}

export async function getMatch(matchId){
    try{
        const response = await axios.get(`http://localhost:3030/api/v1/matches/${matchId}`);
        return response.data;
    }
    catch(err){
        throw err;
    }
}

export async function getMatchesByPhase(phase){
    try{
        const response = await axios.get(`http://localhost:3030/api/v1/matches/phase/${phase}`);
        return response.data;
    }
    catch(err){
        return [];
    }
}

export async function getLiveMatches(){
    try{
        const response = await axios.get('http://localhost:3030/api/v1/matches/live');
        return response.data;
    }
    catch(err){
        return [];
    }
}

export async function updateMatchGoal(matchId, team, value){
    try{
        const response = await axios.patch(`http://localhost:3030/api/v1/matches/${matchId}/goal/${team}/${value}`);
        return response.data;
    }
    catch(err){
        throw err;
    }
}

export async function startMatch(id){
    try{
        const response = await axios.patch(`http://localhost:3030/api/v1/matches/${id}/start`);
        return response.data;
    }
    catch(err){
        throw err;
    }
}

export async function endMatch(id){
    try{
        const response = await axios.patch(`http://localhost:3030/api/v1/matches/${id}/end`);
        return response.data;
    }
    catch(err){
        throw err;
    }
}

export async function createMatch(match){
    console.log("POST", match);
    try{
        const response = await axios.post('http://localhost:3030/api/v1/matches', match);
        return response.data;
    }
    catch(err){
        throw err;
    }
}