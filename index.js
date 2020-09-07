const express = require("express");
const postsRouter = require('./posts-router.js')

const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter)


server.listen(5000, () => {
    console.log('\n*** server running on http://localhost:5000 ***\n')
})

module.exports = server;