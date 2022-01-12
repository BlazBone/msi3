const keys = require('./keys');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort,
});

pgClient.on('connect', (client) => {
    client
        .query('CREATE TABLE IF NOT EXISTS test (number INT)')
        .catch((err) => console.log('PG ERROR', err));
});

app.get('/', (req, res) => {
    res.send('Hi');
});

app.get('/now', async (req, res) => {
    try {
        const { rows } = await pgClient.query('SELECT NOW()');
        res.status(200).send(rows[0].now);
    } catch (err) {
        console.log(err);
    }
});

app.get('/test', async (req, res) => {
    try {
        res.status(200).send('DELUJEEEEEEEEE');
    } catch (err) {
        console.log(err);
    }
});

app.post('/dodajPredmet', async (req, res) => {
    try {
        await pgClient.query(`CREATE TABLE IF NOT EXISTS  ocene (
          ocena integer NOT NULL,
          predmet varchar(255) NOT NULL,
          PRIMARY KEY (predmet))`);

        const { ocena, predmet } = req.body;
        console.log(ocena, predmet);
        const { rows } = await pgClient.query(`
INSERT INTO ocene(ocena, predmet)VALUES(${ocena},'${predmet}')
`);
        res.status(200).send(rows);
    } catch (err) {
        console.log(err);
    }
});
app.get('/vseOcene', async (req, res) => {
    try {
        const { rows } = await pgClient.query('SELECT * FROM ocene');
        res.status(200).send(rows);
        console.log(rows);
    } catch (err) {
        console.log(err);
    }
});

app.listen(5000, (err) => {
    console.log('Listening');
});
