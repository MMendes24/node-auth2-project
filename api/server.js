const express = require('express')

const usersRouter = require('../users/usersRouter')
const authRouter = require('../auth/authRouter')

const server = express()

server.use(express.json());

server.use('/api', usersRouter);
server.use('/api/auth', authRouter);

module.exports = server;