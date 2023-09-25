import * as express from 'express';
import { Constants } from '../src/app/config/constants'
import axios from 'axios';

const app = express.Router();

app.get('/', (req, res) => res.send('Hello world'));


app.get('/summoner', async (req, res) => {
    try {
        const riotApiToken = 'RGAPI-XXXXXX';
        const headers = {
            'X-Riot-Token': riotApiToken,
          };

        //const constants = new Constants();
        //const url = constants.BR1SERVER + constants.summonerUrlByName + 'prkalva';
        const url = 'https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/prkalva';

        axios.get(url, { headers })
        .then((response) => {
        const summonerData = response.data;
        console.log(summonerData);
        })
        .catch((error) => {
        console.error('Erro na requisição:', error);
        });
    } catch (e) {
        console.log("[Error GET / Summoner] - " + e);
    }
})

export { app as routes};