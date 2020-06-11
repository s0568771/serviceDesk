import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Mensa = new Schema({
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

export default mongoose.model('Mensa', Mensa, 'mensen');
