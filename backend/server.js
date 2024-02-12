const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const db = new Pool({
    user: 'ateffawaz',
    host: 'localhost',
    database: 'twitter-clone',
    password: 'atef2004',
    port: 5550,
});


db.on('connect', () => {
    console.log('Connected to PostgreSQL');
});

db.on('end', () => {
    console.log('Disconnected from PostgreSQL');
});


const app = express();
app.use(cors());
app.use(express.json());



// app.post("/signup", (req, res) => {
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.password
//     ];

//     const query = "INSERT INTO login (name, email, password) VALUES ($1, $2, $3)";

//     db.query(query, values, (err, data) => {
//         if (err) {
//             return res.json(err);
//         }
//         return res.json(data);
//     });
// });

// app.post("/login", (req, res) => {
//     const query = "SELECT * FROM login WHERE email = $1 AND password = $2";

//     db.query(query, [req.body.email, req.body.password], (err, data) => {
//         if (err) {
//             console.log(err);
//         }
//         if (data.rows.length > 0) {
//             return res.json("Success");
//         } else {
//             return res.json("Fail");
//         }
//     });
// });

app.listen(2023, () => {
    console.log("server listening on 2023");
});
