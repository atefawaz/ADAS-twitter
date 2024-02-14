const express = require('express');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({
    user: 'ateffawaz',
    host: 'localhost',
    database: 'twitter-clone',
    password: 'atef2004',
    port: 5550,
});

try {
    client.connect()
  .then(
    console.log('Connected to PostgreSQL database')
  )
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });
} catch(e) {
    console.log(e)
}



app.post("/signup", (req, res) => {
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    const query = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)";


    client.query(query, values, (err, data) => {
        if (err) {
            console.error('Error executing signup query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});

app.post("/login", (req, res) => {
    const query = "SELECT * FROM users WHERE email = $1 AND password = $2";

    client.query(query, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.log(err);
        }
        if (data.rows.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Fail");
        }
    });
});

app.listen(2023, () => {
    console.log("server listening on 2023");
});
