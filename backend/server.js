import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Mensa from './models/Mensa';
import * as cron from "node-cron";


const app = express();
const router = express.Router();
const webpush = require('web-push')
const publicKey = "BKLkI8l4j8fAVwP6FrBKGXQtRwncyYNWq-NJyiMyfGHUSe2AEGp1jMLVpJsAdOq1qPP3Go2CuYMGAw7QDLCFi9k"
const privateKey = "PmQW0WdgFuwdFBqmzq42Oq6iNYG66v1lvKUYCwP5MBQ"

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
const fakeDatabase = []
let body = []
let gerichte = ""
let run = false;

webpush.setVapidDetails('mailto:d.nutzinger@gmail.com', publicKey, privateKey)

app.post('/subscription', (req, res) => {
    const subscription = req.body
    fakeDatabase.push(subscription)
    console.log(fakeDatabase)
    res.send("ok!")
})
app.post('/fave', (req, res) => {
    console.log(req.body)
    if (req.body.run) {
        run = false;
    } if(!req.body.run) {
        body.push(req.body)
        let json = body[0]
        run = true;
        for (var key in json) {
            gerichte = gerichte.concat(key + " ", json[key] + "\n")
        }
        res.send({"ok": "Favoriten!"})
    }
})
cron.schedule('0 */1 * * * *', () => {
    console.log(run)
    if (run) {
        const notificationPayload = {
            notification: {
                title: 'Deine heutigen Mensamahlzeiten!',
                body: gerichte,
                icon: 'assets/icons/icon-512x512.png',
            },
        }
        const promises = []
        fakeDatabase.forEach(subscription => {
            promises.push(
                webpush.sendNotification(
                    subscription,
                    JSON.stringify(notificationPayload)
                )
            )
        })
    }
});
app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));


