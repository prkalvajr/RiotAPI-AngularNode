import * as express from 'express';
import axios from 'axios';

const app = express.Router();

app.get('/', (req, res) => res.send('Hello world'));

declare var process : {
    env: {
        RiotAPIToken: string
    }
}

app.get('/summoner/:region/:summonerName', async (req, res) => {
    try {    
        const summonerName = req.params.summonerName;
        const region = req.params.region;
        const riotApiToken = 'RGAPI-62c6a50c-69b3-47f7-9972-eb4062f47ce8';
        
        const headers = {
            'X-Riot-Token': riotApiToken,
            'Access-Control-Allow-Origin' : '*'
          };

        const url = getRegionUrl(region) + `/lol/summoner/v4/summoners/by-name/${summonerName}`;

        console.log("API TOken: " + riotApiToken);
        console.log("URL: " + url);

        axios.get(url, { headers })
        .then((response) => {
        const summonerData = response.data;
        res.send(summonerData);
        })
        .catch((error) => {
        console.error('Erro na requisição:', error);
        });
    } catch (e) {
        console.log("[Error GET / Summoner] - " + e.response);
    }
})


app.get('/match/:region/:summonerId', async (req, res) => {
    try {
        const region = req.params.region;
        const summonerId = req.params.summonerId;   
        const riotApiToken = 'RGAPI-62c6a50c-69b3-47f7-9972-eb4062f47ce8';

        const headers = {
            'X-Riot-Token': riotApiToken,
            'Access-Control-Allow-Origin' : '*'
          };

        const spectateUrl = getRegionUrl(region) + `/lol/spectator/v4/active-games/by-summoner/${summonerId}`;

        axios.get(spectateUrl, { headers })
        .then((response) => {

        const matchData = response.data;
        res.send(matchData);

        })
        .catch((error) => {
            res.send("error 404");
            console.error('Erro na requisição:', error);
        });

    } catch (e) {
        console.log("[Error GET / Match] - " + e);
    }
})

app.get('/rank/:region/:summonerId', async (req, res) => {
    try {
        const region = req.params.region;
        const summonerId = req.params.summonerId;   
        const riotApiToken = 'RGAPI-62c6a50c-69b3-47f7-9972-eb4062f47ce8';

        const headers = {
            'X-Riot-Token': riotApiToken,
            'Access-Control-Allow-Origin' : '*'
          };

        const rankUrl = getRegionUrl(region) + `/lol/league/v4/entries/by-summoner/${summonerId}`;

        axios.get(rankUrl, { headers })
        .then((response) => {

        const matchData = response.data;
        res.send(matchData);

        })
        .catch((error) => {
            res.send("error 404");
            console.error('Erro na requisição:', error);
        });
    }
    catch (e) {
        console.log("[Error GET / Rank] - " + e);
    }
})

function getRegionUrl(regionAlias: string) {
    switch(regionAlias) {
        default: case 'br': return 'https://br1.api.riotgames.com';
        case 'na': return 'https://na1.api.riotgames.com';
        case 'eu': return 'https://euw1.api.riotgames.com';
        case 'jp': return 'https://jp1.api.riotgames.com';
        case 'oce': return 'https://oc1.api.riotgames.com';
        case 'ru': return 'https://ru.api.riotgames.com';
    }
}

export { app as routes};