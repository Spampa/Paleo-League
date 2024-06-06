const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectionLimit: 5
});

async function createDatabase(){
    let conn;
    try{
        conn = await pool.getConnection();
        await conn.query("CREATE DATABASE IF NOT EXISTS paleo_league");
    }
    catch(err){
        throw err;
    }
    finally{
        createTables();
    }
}

async function createTables(){
    let conn;
    try{
        conn = await pool.getConnection();
        await conn.query("USE paleo_league");
        await conn.query(`
            CREATE TABLE IF NOT EXISTS teams(
                team_id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                class VARCHAR(255) NOT NULL,
                description TEXT
            )
        `);

        await conn.query(`
            CREATE TABLE IF NOT EXISTS matches(
                match_id INT PRIMARY KEY AUTO_INCREMENT,
                tournament_phase VARCHAR(255) NOT NULL,
                homeTeam INT NOT NULL,
                awayTeam INT NOT NULL,
                homeScore INT,
                awayScore INT,
                match_date DATETIME NOT NULL,
                start_time DATETIME,
                end_time DATETIME,
                FOREIGN KEY (homeTeam) REFERENCES teams(team_id),
                FOREIGN KEY (awayTeam) REFERENCES teams(team_id)
            )
        `)

        /*inserimento squadre
        await conn.query(`
            INSERT INTO teams(name, class) VALUES
            ('Pink Roccia', '3IC'),
            ('Win or Go Home', '3IF'),
            ('Bacca Team', '5ID'),
            ('5_MB prime', '5MB'),
            ('Figli del Brasiliano', '3MD'),
            ('Drim Tim', '4MB'),
            ("L'hai finita?", '5IC'),
            ('Lago Duria', '5ID'),
            ('I Tori di BG', '1EB'),
            ('AC Oglioni', '2IB'),
            ('1IG', '1IG'),
            ('Congestionati', '1IA'),
            ('1mb For Real', '1MB'),
            ('Scarsenal', '1MF'),
            ('Pozzoni Trasporti', '2MA'),
            ('Brena Team', '3EA')
        `);*/

        //tabella utenti
        await conn.query(`
            CREATE TABLE IF NOT EXISTS users(
                user_id CHAR(32) PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                surname VARCHAR(255) NOT NULL,
                role VARCHAR(255) DEFAULT 'user',
                picture TEXT
            )
        `);
    }
    catch(err){
        throw err;
    }
    finally{
        console.log("Database and tables created");
        if(conn) conn.end();
    }
}

module.exports = {
    createDatabase
}