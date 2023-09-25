import * as express from 'express';
import { routes } from './routes';
import axios from 'axios';

const app = express();

app.use((req, res, next) => {
    const riotApiToken = 'RGAPI-xxxxxx';
    //res.header('Access-Control-Allow-Origin', '*');
    //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE')

    res.header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36");
    res.header("Accept-Language", "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7");
    res.header("Accept-Charset", "application/x-www-form-urlencoded; charset=UTF-8");
    res.header("Origin", "https://developer.riotgames.com");
    res.header('X-Riot-Token', `${riotApiToken}`);
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
    }
    next();
})

app.use(express.json());

app.use('/', routes);

app.listen(4201, '127.0.0.1', function() {
    console.log('Listining on 4201');
})