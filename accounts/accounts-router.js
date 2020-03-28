const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    // get data from db
    // select * from accounts
    db.select('*')
        .from('accounts') // returns a promise
        .then(rows => {
            res.status(200).json({ data: rows })
        })
        .catch(error => {
            res.status(500).json({ message: 'sorry, ran into an error' })
        })
});


module.exports = router;