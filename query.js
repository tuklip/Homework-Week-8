const pool = require("./config.js");
const express = require("express");
const router = express.Router();


router.get("/film", (req, res) => {

    const query = `
        SELECT * FROM film
    `

    pool.query(query, (err, response) => {
        if(err) throw err

        res.status(200).json(response.rows)
    })
})

router.get("/film/:id", (req, res) => {

    const {id} = req.params;

    const findQuery = `
        SELECT
            *
        FROM film
            WHERE film_id = $1
    `

    pool.query(findQuery,[id], (err, response) => {
        if(err) throw err

        res.status(200).json(response.rows[0])
    })
})

router.get("/kategori", (req, res) => {

    const findQuery = `
        SELECT * FROM category
    `

    pool.query(findQuery, (err, response) => {
        if(err) throw err

        res.status(200).json(response.rows)
    })
})

router.get("/kategori/:id", (req, res) => {

    const {id} = req.params;

    const findQuery = `
    SELECT
        *
    FROM
        film
    INNER JOIN film_category
        ON film_category.film_id = film.film_id
    INNER JOIN category
        ON film_category.category_id = category.category_id
	WHERE category.category_id = ${id}
    `

    pool.query(findQuery, (err, response) => {
        if(err) throw err

        res.status(200).json(response.rows)
    })
})

module.exports = router;