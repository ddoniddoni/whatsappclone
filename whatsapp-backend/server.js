// importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import cors from "cors";
import Pusher from "pusher";

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const Messages = require("./dbMessage.js");

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1075287",
  key: "d1775659e7fbf40cca23",
  secret: "1934d56246f4d51b8bd2",
  cluster: "ap3",
  encrypted: true,
});

// middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// DB config
const connetcion_url =
  "mongodb+srv://admin:IXklrpmI7vy3gSnI@cluster0.zzsxd.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connetcion_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ????

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("A Change occured", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});
// api routes
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
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
