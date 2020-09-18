// importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import cors from "cors";

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const Messages = require("./dbMessage.js");

// app config
const app = express();
const port = process.env.PORT || 9000;
app.use(cors());
// middleware

// DB config
const connetcion_url =
  "mongodb+srv://admin:IXklrpmI7vy3gSnI@cluster0.zzsxd.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connetcion_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ????

// api routes
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/api/vi/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
