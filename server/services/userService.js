const pool = require('../config/pool');

async function getUser(email){
    let conn;
    try{
        conn = await pool.getConnection();
        const [rows] = await conn.query(`
            SELECT * FROM users WHERE email = ?
        `, [email]);
        return rows;
    }
    catch(err){
        console.error(err);
        return null;
    }
    finally{
        if(conn) conn.end();
    }
}

async function createUser(id, email, name, surname, picture){
    console.log("Create user")
    let conn;
    try{
        conn = await pool.getConnection();
        await conn.query(`
            INSERT INTO users(user_id, email, name, surname, picture) VALUES
            (?, ?, ?, ?, ?)
        `, [id, email, name, surname, picture]);
        return true;
    }
    catch(err){
        console.error(err);
        return false;
    }
    finally{
        if(conn) conn.end();
    }
}

module.exports = {
    getUser,
    createUser
};