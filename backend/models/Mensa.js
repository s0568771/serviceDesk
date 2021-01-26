const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MensaSchema = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  city: {
    type: String
  },
  address: {
    type: String
  },
  coordinates: {
    type: [Number]
  }
});

const Mensa = mongoose.model('Mensa', MensaSchema);

module.exports = { Mensa }
// export default mongoose.model('Mensa', Mensa, 'mensen');
