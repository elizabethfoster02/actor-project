const express = require("express")
const app = express();
const { Pool } = require('pg')

const pool = new Pool({ connectionString: "postgresql://postgres:post@localhost:5432/dvdrental" })
console.log(process.env.DATABASE_URL);

app.listen(7000, () => console.log("Listening!"));

app.get(`/api/movies`, async(req, res) => {
    console.log(req.query.id)
    const titles = await pool.query 
                                      (`SELECT title,
                                             release_year,
                                             description,
                                             array (SELECT  actor.first_name || ' ' || actor.last_name AS full_name
                                                    FROM film_actor
                                                    JOIN actor ON film_actor.actor_id = actor.actor_id
                                                    WHERE film.film_id = film_actor.film_id
                                                    ) as actor_list
                                      FROM film
                                      WHERE film.film_id = $1`, [req.query.id])
    if (titles.rows.length > 0) {
        res.json(titles.rows[0])
    } else {
        res.status(404).end("Film not found")
    }
})

// gets the title of the movies for in
app.get('/api', async(req, res) => {
    const titles = await pool.query (`SELECT film.film_id,
                                             title,
                                             release_year,
                                             description,
                                             array (SELECT  actor.first_name || ' ' || actor.last_name AS full_name
                                                    FROM film_actor
                                                    JOIN actor ON film_actor.actor_id = actor.actor_id
                                                    WHERE film.film_id = film_actor.film_id
                                                    ) as actor_list
                                      FROM film`)
    res.json(titles.rows)
})