const pool = require("../config/pool");

async function getTeams() {
    let conn;
    try {
        conn = await pool.getConnection();
        const teams = await conn.query(`
            SELECT * FROM teams
        `);
        return teams;
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) conn.end();
    }
}

module.exports = {
    getTeams
}