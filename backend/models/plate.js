const mongoose = require('mongoose');

const plateSchema = mongoose.Schema({
  name: { type: String, required: true },
  plateNumber: { type: String, required: true }
});

module.exports = mongoose.model('Plate', plateSchema);
