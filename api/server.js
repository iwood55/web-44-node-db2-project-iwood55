const express = require("express")

const helmet = require("helmet");

const server = express()

const carRouter = require('./cars/cars-router')

server.use(helmet());
server.use(express.json());

server.use("/api/cars", carRouter)

module.exports = server
