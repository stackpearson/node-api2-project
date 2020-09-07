const express = require('express');
const router = express.Router();
const dataEntries = require('./data/db.js')


///----------------------Get Requests---------------------///
//get all posts
router.get('/', (req, res) => {
    dataEntries.find(req.query)
    .then(data => {
        res.status(200).json(data)
    })
    .catch( error => {
          console.log(error);
          res.status(500).json({message: 'error getting messages', err})
      });
})

//get post by id
router.get('/:id', (req, res) => {
    dataEntries.findById(req.params.id)
    .then(data => {
        res.status(200).json(data)
    })
    .catch( error => {
        res.status(500).json({message: 'id not valid'})
    });
})

//get comments by post id
router.get('/:id/comments', (req, res) => {
    dataEntries.findCommentById(req.params.id)
    .then(data => {
        res.status(200).json(data)
    })
    .catch( error => {
        res.status(500).json({message: 'id not valid'})
    })
})


module.exports = router;