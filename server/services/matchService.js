const pool = require("../config/pool");

async function getMatches() {
    let conn;
    try {
        conn = await pool.getConnection();
        const matches = await conn.query(`
            SELECT m.match_id, m.tournament_phase, m.homeTeam, m.awayTeam, m.match_date, m.homeScore, m.awayScore, m.start_time, m.end_time, 
            t1.name AS homeTeamName, t1.class AS homeTeamClass, t1.description AS homeTeamDescription, 
            t2.name AS awayTeamName, t2.class AS awayTeamClass, t2.description AS awayTeamDescription
            FROM matches m
            JOIN teams t1 ON m.homeTeam = t1.team_id
            JOIN teams t2 ON m.awayTeam = t2.team_id
        `);
        return matches.map(match => {
            return {
                matchId: match.match_id,
                tournamentPhase: match.tournament_phase,
                homeTeam: {
                    teamId: match.homeTeam,
                    name: match.homeTeamName,
                    class: match.homeTeamClass,
                    description: match.homeTeamDescription
                },
                awayTeam: {
                    teamId: match.awayTeam,
                    name: match.awayTeamName,
                    class: match.awayTeamClass,
                    description: match.awayTeamDescription
                },
                matchDate: match.match_date,
                homeScore: match.homeScore,
                awayScore: match.awayScore,
                startTime: match.start_time,
                endTime: match.end_time
            };
        });
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

async function getMatch(matchId) {
    let conn;
    try {
        conn = await pool.getConnection();
        const match = await conn.query(`
            SELECT m.match_id, m.tournament_phase, m.homeTeam, m.awayTeam, m.match_date, m.homeScore, m.awayScore, m.start_time, m.end_time,
            t1.name AS homeTeamName, t1.class AS homeTeamClass, t1.description AS homeTeamDescription,
            t2.name AS awayTeamName, t2.class AS awayTeamClass, t2.description AS awayTeamDescription
            FROM matches m
            JOIN teams t1 ON m.homeTeam = t1.team_id
            JOIN teams t2 ON m.awayTeam = t2.team_id
            WHERE match_id = ?`, 
            [matchId]
        );
        if (match.length === 0) return null;
        return {
            matchId: match[0].match_id,
            tournamentPhase: match[0].tournament_phase,
            homeTeam: {
                teamId: match[0].homeTeam,
                name: match[0].homeTeamName,
                class: match[0].homeTeamClass,
                description: match[0].homeTeamDescription
            },
            awayTeam: {
                teamId: match[0].awayTeam,
                name: match[0].awayTeamName,
                class: match[0].awayTeamClass,
                description: match[0].awayTeamDescription
            },
            matchDate: match[0].match_date,
            homeScore: match[0].homeScore,
            awayScore: match[0].awayScore,
            startTime: match[0].start_time,
            endTime: match[0].end_time
        };
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

async function getMatchesByPhase(phase) {
    let conn;
    try {
        conn = await pool.getConnection();
        const matches = await conn.query(`
            SELECT m.match_id, m.tournament_phase, m.homeTeam, m.awayTeam, m.match_date, m.homeScore, m.awayScore, m.start_time, m.end_time, 
            t1.name AS homeTeamName, t1.class AS homeTeamClass, t1.description AS homeTeamDescription, 
            t2.name AS awayTeamName, t2.class AS awayTeamClass, t2.description AS awayTeamDescription
            FROM matches m
            JOIN teams t1 ON m.homeTeam = t1.team_id
            JOIN teams t2 ON m.awayTeam = t2.team_id
            WHERE tournament_phase = ?
        `, [phase]);
        return matches.map(match => {
            return {
                matchId: match.match_id,
                tournamentPhase: match.tournament_phase,
                homeTeam: {
                    teamId: match.homeTeam,
                    name: match.homeTeamName,
                    class: match.homeTeamClass,
                    description: match.homeTeamDescription
                },
                awayTeam: {
                    teamId: match.awayTeam,
                    name: match.awayTeamName,
                    class: match.awayTeamClass,
                    description: match.awayTeamDescription
                },
                matchDate: match.match_date,
                homeScore: match.homeScore,
                awayScore: match.awayScore,
                startTime: match.start_time,
                endTime: match.end_time
            };
        });
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

async function getLiveMatches() {
    let conn;
    try {
        conn = await pool.getConnection();
        const matches = await conn.query(`
            SELECT m.match_id, m.tournament_phase, m.homeTeam, m.awayTeam, m.match_date, m.homeScore, m.awayScore, m.start_time, m.end_time, 
            t1.name AS homeTeamName, t1.class AS homeTeamClass, t1.description AS homeTeamDescription, 
            t2.name AS awayTeamName, t2.class AS awayTeamClass, t2.description AS awayTeamDescription
            FROM matches m
            JOIN teams t1 ON m.homeTeam = t1.team_id
            JOIN teams t2 ON m.awayTeam = t2.team_id
            WHERE m.start_time IS NOT NULL AND m.end_time IS NULL
        `);
        return matches.map(match => {
            return {
                matchId: match.match_id,
                tournamentPhase: match.tournament_phase,
                homeTeam: {
                    teamId: match.homeTeam,
                    name: match.homeTeamName,
                    class: match.homeTeamClass,
                    description: match.homeTeamDescription
                },
                awayTeam: {
                    teamId: match.awayTeam,
                    name: match.awayTeamName,
                    class: match.awayTeamClass,
                    description: match.awayTeamDescription
                },
                matchDate: match.match_date,
                homeScore: match.homeScore,
                awayScore: match.awayScore,
                startTime: match.start_time,
                endTime: match.end_time
            };
        });
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }

}

async function createMatch(match){
    const date = new Date(match.matchDate);
    let conn;
    try{
        conn = await pool.getConnection();
        const result = await conn.query(`
            INSERT INTO matches(tournament_phase, homeTeam, awayTeam, match_date) VALUES(?, ?, ?, ?)`,
            [match.tournamentPhase, match.homeTeam, match.awayTeam, date]
        );
        const newMatch = await getMatch(result.insertId);
        return newMatch;
    }
    catch(err){
        throw err;
    }
    finally{
        if(conn) conn.end();
    }
}

async function updateMatch(matchId, match){
    const date = new Date(match.matchDate);
    let conn;
    try{
        conn = await pool.getConnection();
        await conn.query(`
            UPDATE matches SET 
            tournament_phase = ?, homeTeam = ?, awayTeam = ?, match_date = ?, homeScore = ?, awayScore = ?, start_time = ?, end_time = ?`,
            [match.tournamentPhase, match.homeTeam, match.awayTeam, date, match.homeScore, match.awayScore, match.startTime, match.endTime]
        );
        const updatedMatch = await getMatch(matchId);
        return updatedMatch;
    }
    catch(err){
        throw err;
    }
    finally{
        if(conn) conn.end();
    }
}

async function updateMatchGoal(matchId, team, value){
    console.log(matchId, team);
    let conn;
    try{
        conn = await pool.getConnection();
        await conn.query(`
            UPDATE matches SET ${team} = ${team} + ? WHERE match_id = ?`,
            [value, matchId]
        );
        const updatedMatch = await getMatch(matchId);
        return updatedMatch;
    }
    catch(err){
        throw err;
    }
    finally{
        if(conn) conn.end();
    }
}

async function startMatch(id){
    let conn;
    try{
        conn = await pool.getConnection();
        await conn.query(`
            UPDATE matches SET
            homeScore = 0, awayScore = 0,
            start_time = NOW() WHERE match_id = ?`,
            [id]
        );
        return await getMatch(id);
    }
    catch(err){
        throw err;
    }
    finally{
        if(conn) conn.end();
    }
}

async function endMatch(id){
    let conn;
    try{
        conn = await pool.getConnection();
        await conn.query(`
            UPDATE matches SET end_time = NOW() WHERE match_id = ?`,
            [id]
        );
        return await getMatch(id);
    }
    catch(err){
        throw err;
    }
    finally{
        if(conn) conn.end();
    }
}

module.exports = {
    getMatches,
    getMatch,
    getMatchesByPhase,
    getLiveMatches,
    createMatch,
    updateMatch,
    updateMatchGoal,
    startMatch,
    endMatch
}