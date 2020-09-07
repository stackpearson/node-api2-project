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
    .catch( err => {
        res.status(400).json({ error: "The post information could not be retrieved." })
        res.status(404).json({message: "The post with the specified ID does not exist."})
    });
})

//get comments by post id
router.get('/:id/comments', (req, res) => {
    dataEntries.findCommentById(req.params.id)
    .then(data => {
        res.status(200).json(data)
    })
    .catch( err => {
        res.status(404).json({message: 'id not valid'})
    })
})

///----------------------Post Requests---------------------///
//post new post
router.post('/', (req, res) => {
    dataEntries.insert(req.body)
    .then(entry => {
        res.status(201).json(entry)
    })
    .catch(err => {
        res.status(400).json({
            error: 'Please provide title and contens for the post.'
        })
        res.status(500).json({
            error: "There was an error while saving the post to the database"
        })
    })
})

//post comment to post refereced by id
router.post('/:id/comments', (req, res) => {
    dataEntries.insertComment(req.body)
    .then(entry => {
        res.status(201).json(entry)
    })
    .catch(err => {
        res.status(500).json({ error: "system error"})
        res.status(404).json({message: "The post with the specified ID does not exist"})
        res.status(400).json({errorMessage: "please provide text for the comment"})
    })
})

module.exports = router;