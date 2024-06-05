const { Router } = require('express');
const matchService = require('../services/matchService');

const router = Router();

router.get('/api/v1/matches', async (req, res) => {
    const matches = await matchService.getMatches();
    if(matches.length === 0) return res.status(404).send("No matches found");
    else res.json(matches);
});

router.get('/api/v1/matches/:matchId', async (req, res) => {
    const matchId = parseInt(req.params.matchId);
    const match = await matchService.getMatch(matchId);
    if(match === null) return res.status(404).send("Match not found");
    else res.json(match);
});

router.post('/api/v1/matches', async (req, res) => {
    const match = req.body;
    const newMatch = await matchService.createMatch(match);
    res.json(newMatch);
});

router.put('/api/v1/matches/:matchId', async (req, res) => {
    const matchId = parseInt(req.params.matchId);
    const match = req.body;
    const updatedMatch = await matchService.updateMatch(matchId, match);
    res.json(updatedMatch);
});

module.exports = router;