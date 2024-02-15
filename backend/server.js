// sathya is here now 
const express = require('express');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'twitter',
    password: 'Atef2004',
    port: 5432,
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
    const {name, email, password} = req.body;

    const userValues = [
        name[0],
        email[0],
        password[0],
    ]

    console.log(userValues);
    const query = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)";

    client.query(query, userValues, (err, data) => {
        if (err) {
            console.log('there is a problem')
            console.error('Error executing signup query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('its not successful')
        return res.json(data);
    });
});

app.post("/login", (req, res) => {
    const query = "SELECT * FROM users WHERE email = $1 AND password = $2";

    client.query(query, [req.body.email[0], req.body.password[0]], (err, data) => {
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
