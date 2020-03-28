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

router.get('/:id', (req, res) => {
    db('accounts')
        // alternate way to write the .where 
        // .where('id', '=', req.params.id)
        .where({ id: req.params.id })
        .first() // grabs just the first element, can also write it with rows[0] in the then 200 statement
        .then(account => {
            if (account) {
                res.status(200).json({ data: account })
            } else {
                res.status(404).json({ message: "account not found" })
            } // you still get a collection back, even though it's just one item, always an array
        })
        .catch(error => {
            res.status(500).json({ message: 'sorry, ran into an error' })
        })
});


router.post('/', (req, res) => {
    //shortcut to the table in the () after db
    // insert needs two arguments, the body and a string that is sent back, which is the last id
    // in postgres you have to say what you want back, not just id in string
    db('accounts')
        .insert(req.body, 'id')
        // you get back an array, we're calling it ids
        .then(ids => {
            res.status(201).json({ results: ids })
        })
        .catch(error => {
            res.status(500).json({ message: 'sorry, ran into an error' })
        })
});

// almost identical to delete, just needs another argument
// you can send in only part of the object (the req body does not need all required fields), it'll change just that part
router.put('/:id', (req, res) => {
    const changes = req.body;
    db('accounts')
        .where({ id: req.params.id })
        .update(changes) // needs two arguments
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "update success" })
            } else {
                res.status(404).json({ message: "account not found" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "argh error" })
        })
});

router.delete('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .del() // delete the records
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "delete success" })
            } else {
                res.status(404).json({ message: "account not found" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "argh error" })
        })
});

module.exports = router;