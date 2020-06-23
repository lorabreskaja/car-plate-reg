const express = require('express');

const app = express();

app.use("/api/plates", (req, res, next) => {
  const plates = [
    {id: 'cfdscsdcfsedcs',
    name: 'Dalius',
    plateNumber: 'EDV780'
    },
    {id: 'cfdscsdcfsedcs',
    name: 'Simona',
    plateNumber: 'ENS001'
    },
  ];
  res.status(200).json({
    message: 'Plates fetched succesfully',
    plates: plates
  });
});

module.exports = app;
