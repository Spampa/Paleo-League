const { Router } = require('express');
const matchService = require('../services/matchService');

const router = Router();

const isAdmin = require('../middleware/isAdmin');

router.get('/api/v1/matches', async (req, res) => {
    const matches = await matchService.getMatches();
    if(matches.length === 0) return res.status(404).send("No matches found");
    else res.json(matches);
});

router.get('/api/v1/matches/live', async (req, res) => {
    const liveMatches = await matchService.getLiveMatches();
    if(liveMatches.length === 0) return res.status(404).send("No live matches found");
    else res.json(liveMatches);
});

router.get('/api/v1/matches/:matchId', async (req, res) => {
    const matchId = parseInt(req.params.matchId);
    const match = await matchService.getMatch(matchId);
    if(match === null) return res.status(404).send("Match not found");
    else res.json(match);
});

router.get('/api/v1/matches/phase/:phase', async (req, res) => {
    const phase = req.params.phase;
    const matches = await matchService.getMatchesByPhase(phase);
    if(matches.length === 0) return res.status(404).send("No matches found");
    else res.json(matches);
});

router.post('/api/v1/matches', isAdmin, async (req, res) => {
    const match = req.body;
    const newMatch = await matchService.createMatch(match);
    res.status(201).json(newMatch);
});

router.put('/api/v1/matches/:matchId', isAdmin, async (req, res) => {
    const matchId = parseInt(req.params.matchId);
    const match = req.body;
    const updatedMatch = await matchService.updateMatch(matchId, match);
    res.status(200).json(updatedMatch);
});

router.patch('/api/v1/matches/:matchId/goal/:team/:value', isAdmin, async (req, res) => {
    const matchId = parseInt(req.params.matchId);
    const team = req.params.team + "Score"; // "homeScore" or "awayScore"
    const value = parseInt(req.params.value);
    const updatedMatch = await matchService.updateMatchGoal(matchId, team, value);
    res.status(200).json(updatedMatch);
});

router.patch('/api/v1/matches/:matchId/start', isAdmin, async (req, res) => {
    const matchId = parseInt(req.params.matchId);
    const updatedMatch = await matchService.startMatch(matchId);
    res.status(200).json(updatedMatch);
});

router.patch('/api/v1/matches/:matchId/end', isAdmin, async (req, res) => {
    const matchId = parseInt(req.params.matchId);
    const updatedMatch = await matchService.endMatch(matchId);
    res.status(200).json(updatedMatch);
});

module.exports = router;