import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Mensa from './models/Mensa';


const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

const mongo = mongoose.connect('mongodb://localhost:27017/mensen', {useUnifiedTopology: true, useNewUrlParser: true});
mongo.then(() => {
  console.log('connected');
}).catch((err) => {
  console.log('err', err);
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully!')
});


router.route('/mensen').get((req, res) => {
  Mensa.find((err, mensen) => {
    if (err) {
      console.log(err)
    } else {
      res.json(mensen);
    }
  });
});

router.route('/mensen/:id').get((req, res) => {
  Mensa.findById(req.params.id, (err, mensa) => {
    if (err)
      console.log(err)
    else
      res.json(mensa);
  });
});

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));

