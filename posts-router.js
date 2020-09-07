const express = require('express');
const router = express.Router();
const dataEntries = require('./data/db.js')

router.get('/', (req, res) => {
    dataEntries.find(req.query)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: 'error retrieving data'});
    })
})


module.exports = router;