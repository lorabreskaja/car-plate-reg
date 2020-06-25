const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Plate = require('./models/plate');

const app = express();

mongoose.connect("mongodb+srv://larisa:q00WRYyuJRXUWM1h@cluster0-jt1jh.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
  next();
});

app.post("/api/plates", (req, res, next) => {
  const plate = new Plate({
    name: req.body.name,
    plateNumber: req.body.plateNumber
  });
  plate.save().then(createdPlate => {
    res.status(201).json({
      message: 'Plate added successfully',
      plateId: createdPlate._id
    });
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  const plate = new Plate({
    _id: req.body.id,
    name: req.body.name,
    plateNumber: req.body.plateNumber
  });
  Plate.updateOne({_id: req.params.id}, plate).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update successful'});
  });
});

app.get("/api/plates", (req, res, next) => {
  Plate.find().then(documents => {
    res.status(200).json({
      message: 'Plates fetched successfully',
      plates: documents
    });
  });
});

app.get("/api/plates/:id", (req, res, next) => {
  Plate.findById(req.params.id).then(plate => {
    if (plate) {
      res.status(202).json(plate);
    } else {
      res.status(404).json({message: 'Plate not found'});
    }
  })
});

app.delete("/api/plates/:id", (req, res, next) => {
  Plate.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Plate deleted'});
  });
});

module.exports = app;
