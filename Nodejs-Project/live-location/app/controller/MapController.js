const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
module.exports = {
  view: async function (req, res) {
    res.render("index");
  }
};
