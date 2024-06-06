'use server';

import axios from 'axios';

export async function getAllTeams(){
    try{
        const response = await axios.get('http://localhost:3030/api/v1/teams');
        return response.data;
    }
    catch(err){
        return [];
    }
}