// const express = require('express');
// const keys = require('./keys');

// const cors = require('cors');

// const port = 5000;
// const app = express();
// app.use(cors());
// app.use(express.json());

// const { Pool } = require('pg');
// const pgClient = new Pool({
//     user: keys.pgUser,
//     host: keys.pgHost,
//     database: keys.pgDatabase,
//     password: keys.pgPassword,
//     port: keys.pgPort,
// });

// // const client = new Client({
// //     host: 'localhost',
// //     user: 'myadmin',
// //     port: 5432,
// //     password: 'mypassword',
// //     database: 'postgres',
// // });

// // const pool = new Pool({
// //     host: 'localhost',
// //     user: 'myadmin',
// //     port: 5432,
// //     password: 'mypassword',
// //     database: 'postgres',
// // });
// // const pool = new Pool();
// // pool.query(`CREATE TABLE ocene (
// //   ocena integer NOT NULL,
// //   predmet varchar(255) NOT NULL,
// //   PRIMARY KEY (predmet)`);
// app.get('/now', async (req, res) => {
//     try {
//         const { rows } = await pgClient.query('SELECT NOW()');
//         res.status(200).send(rows[0].now);
//     } catch (err) {
//         console.log(err);
//     }
// });

// app.get('/test', async (req, res) => {
//     try {
//         res.status(200).send('DELUJEEEEEEEEE');
//     } catch (err) {
//         console.log(err);
//     }
// });

// // app.post('/dodajPredmet', async (req, res) => {
// //     try {
// //         const { rows } = await pool.query('CREATE TABLE ocene(ocena INT)');
// //         res.status(200).send(rows[0].now);
// //     } catch (err) {
// //         console.log(err);
// //     }
// // });
// app.post('/dodajPredmet', async (req, res) => {
//     try {
//         await pgClient.query(`CREATE TABLE IF NOT EXISTS  ocene (
//           ocena integer NOT NULL,
//           predmet varchar(255) NOT NULL,
//           PRIMARY KEY (predmet))`);

//         const { ocena, predmet } = req.body;
//         console.log(ocena, predmet);
//         const { rows } = await pgClient.query(`
// INSERT INTO ocene(ocena, predmet)VALUES(${ocena},'${predmet}')
// `);
//         res.status(200).send(rows);
//     } catch (err) {
//         console.log(err);
//     }
// });
// app.get('/vseOcene', async (req, res) => {
//     try {
//         const { rows } = await pgClient.query('SELECT * FROM ocene');
//         res.status(200).send(rows);
//         console.log(rows);
//     } catch (err) {
//         console.log(err);
//     }
// });
// app.listen(port, () => {
//     console.log(`api listening at http://0.0.0.0:${port}`);
// });
const keys = require('./keys');

// Express Application setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client setup
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
        .query('CREATE TABLE IF NOT EXISTS values (number INT)')
        .catch((err) => console.log('PG ERROR', err));
});

//Express route definitions
app.get('/', (req, res) => {
    res.send('Hi');
});

// get the values
app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * FROM values');

    res.send(values);
});

// now the post -> insert value
app.post('/values', async (req, res) => {
    if (!req.body.value) res.send({ working: false });

    pgClient.query('INSERT INTO values(number) VALUES($1)', [req.body.value]);

    res.send({ working: true });
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

// app.post('/dodajPredmet', async (req, res) => {
//     try {
//         const { rows } = await pool.query('CREATE TABLE ocene(ocena INT)');
//         res.status(200).send(rows[0].now);
//     } catch (err) {
//         console.log(err);
//     }
// });
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
