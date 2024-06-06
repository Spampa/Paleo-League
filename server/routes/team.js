const { Router } = require('express');
const teamService = require('../services/teamService');

const router = Router();

router.get('/api/v1/teams', async (req, res) => {
    const teams = await teamService.getTeams();
    if(teams.length === 0) return res.status(404).send("No teams found");
    else res.json(teams);
});

module.exports = router;