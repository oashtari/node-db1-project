const express = require("express");

const db = require("../data/dbConfig.js");

const AccountsRouter = require('../accounts/accounts-router');

const server = express();

server.use(express.json());

server.use("/api/accounts", AccountsRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: "up" })
})

module.exports = server;



// const express = require("express");

// const PostRouter = require("../posts/post-router.js");

// const server = express();

// server.use(express.json());

// server.use("/api/posts", PostRouter);

// server.get("/", (req, res) => {
//     res.status(200).json({ api: "up" });
// });

// module.exports = server;

