import * as express from 'express';
import axios from 'axios';

const app = express.Router();

app.get('/', (req, res) => res.send('Hello world'));


app.get('/summoner/:summonerName', async (req, res) => {
    try {
        const summonerName = req.params.summonerName;
        const riotApiToken = 'RGAPI-f4d722e2-c816-4f69-a579-98a3ff241500';
        const headers = {
            'X-Riot-Token': riotApiToken,
            'Access-Control-Allow-Origin' : '*'
          };

        const url = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;

        axios.get(url, { headers })
        .then((response) => {
        const summonerData = response.data;
        console.log(summonerData);
        res.send(summonerData);
        })
        .catch((error) => {
        console.error('Erro na requisição:', error);
        });
    } catch (e) {
        console.log("[Error GET / Summoner] - " + e);
    }
})


app.get('/match/:summonerId', async (req, res) => {
    try {
        const summonerId = req.params.summonerId;
        const riotApiToken = 'RGAPI-f4d722e2-c816-4f69-a579-98a3ff241500';
        const headers = {
            'X-Riot-Token': riotApiToken,
            'Access-Control-Allow-Origin' : '*'
          };

        const spectateUrl = `https://br1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}`;

        axios.get(spectateUrl, { headers })
        .then((response) => {

        const matchData = response.data;
        console.log(matchData);
        res.send(matchData);

        })
        .catch((error) => {
            res.send("error 404");
            console.error('Erro na requisição:', error);
        });

    } catch (e) {
        console.log("[Error GET / Summoner] - " + e);
    }
})

export { app as routes};