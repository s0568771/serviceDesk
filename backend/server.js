

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Mensa = require('./models/Mensa');
const cron = require("node-cron");
const json = require("body-parser");


const app = express();
const router = express.Router();
// const webpush = require('web-push')
// const publicKey = "BKLkI8l4j8fAVwP6FrBKGXQtRwncyYNWq-NJyiMyfGHUSe2AEGp1jMLVpJsAdOq1qPP3Go2CuYMGAw7QDLCFi9k"
// const privateKey = "PmQW0WdgFuwdFBqmzq42Oq6iNYG66v1lvKUYCwP5MBQ"

app.use(cors());
app.use(bodyParser.json());

//Connect with MongoDB
const mongo = mongoose.connect('mongodb://localhost:27017/Mensen', {useUnifiedTopology: true, useNewUrlParser: true});
mongo.then(() => {
    console.log('connected');
}).catch((err) => {
    console.log('err', err);
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!')

});

router.route('/mensen').post((req,res) =>{
    //we want to create a new list and return the new list doc back to the user (which includes the id)

    let name = req.body.name;
    let address = req.body.address;
    let city = req.body.city;
    let coordinates = req.body.coordinates;
    let canteenId = req.body.id;

    let newList = new Mensa.Mensa(
        req.body // my
    );

    newList.save().then((listDoc) =>{
        //the full list doc is returned (inc. id)
        res.send(listDoc);
    });
});

router.route('/mensen/:id').delete( (req,res) =>{
    Mensa.Mensa.findOneAndRemove({ _id: req.params.id
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    });
});

//Return Mensalist from MongoDB
router.route('/mensen').get((req, res) => {
    Mensa.Mensa.find((err, mensen) => {
        if (err) {
            console.log(err)
        } else {
            res.json(mensen);
        }
    });
});

//Return Single Mensa
router.route('/mensen/:id').get((req, res) => {
    Mensa.Mensa.find( { id: req.params.id }, (err, mensa) => {
        if (err)
            console.log(err)
        else
            res.json(mensa);
    });
});
//safe Push-Subscriptions
const fakeDatabase = []
let body = []
//body of notification
let gerichte = ""
//boolean for running notifications
let run = false;

// webpush.setVapidDetails('mailto:d.nutzinger@gmail.com', publicKey, privateKey)

//add subscription to array
app.post('/subscription', (req, res) => {
    const subscription = req.body
    fakeDatabase.push(subscription)
    res.send("ok!")
})
//Check if user wants to run notifications. If so safe meal data for notification.
app.post('/submeals', (req, res) => {
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
//cron-job for push notifications. For demo every 3 min.
// Change to 9am daily for prod. mode
cron.schedule('0 */3 * * * *', () => {
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


