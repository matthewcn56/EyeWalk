const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use((_req, _res, next) => {
  console.log(`INFO: Got a new request at ${new Date()}.`);
  next();
});

//twilio constants and API keys
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);
//sendgrid email constants and API keys
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//firebase constants, apikeys setup
const firebaseFunctions = require("firebase-functions");
const firebaseAdmin = require("firebase-admin");
const serviceAccount = process.env.FS_SERVICE_ACCOUNT;
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const db = firebaseAdmin.firestore();

/*twilio send message, request contains user's 
display name and a list of numbers to send to */
app.post("/sendSMS", (req, res) => {
  req.body.phoneNumbers.forEach((phoneNumber) => {
    twilioClient.messages
      .create({
        body: `${req.body.displayName} has notified you via EyeWalk! 
        Sent by EYEWALK team, contact eyewalkhelp@gmail.com for any assistance! `,
        //we did not get the eyewalkhelp@gmail.com account, but can as necessary in the future!
        from: process.env.TWILIO_SMS_NUMBER,
        to: phoneNumber,
      })
      .then(
        (responseMessage) => {
          //return success if successfully sent
          console.log("sent to " + phoneNumber);
        },
        (responseMessage) => {
          //return error 400 if fail
          return res.status(400);
        }
      );
  });
  //if everything went well and no failure
  res.send({
    message: "SUCCESS",
  });
});

/*twilio and sendGrid send email, request contains user object
from database and a list of emails to send to*/

app.post("/sendMail", (req, res) => {
  req.body.emails.forEach((email) => {
    const mailMsg = {
      to: email,
      from: req.body.email,
      subject: `${req.body.displayName} has notified you via EyeWalk! `,
      text: `${req.body.displayName} has notified you and the rest of their contacts.

      Sent by EYEWALK team, contact eyewalkhelp@gmail.com for any assistance! `,
    };
  });
});

//firestore deleting anonymous user
//request contains the anonymous user's UID

app.post("/deleteAnonUser", (req, res) => {
  firebaseAdmin
    .auth()
    .deleteUser(req.body.uid)
    .then(
      () => {
        //return success on successful deletion
        console.log("Successfully deleted user!");
        res.status(200).send({
          message: "SUCCESS",
        });
      },
      () => {
        console.log("Error deleting user, user's uid does not exist!");
        return res.status(404);
      }
    );
});

/*add a geofence pass to the database,
request contains user's uid and lat/long */
app.post("/geofence", (req, res) => {
  db.collection("geoTiling")
    .add({
      uid: req.body.uid,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    })
    .then((docRef) => {
      console.log("Added geoTiling incident with id: " + docRef);
      //add to aggregate as necessary
      const roundedLat = req.body.latitude.toFixed(3);
      const roundedLng = req.body.longitude.toFixed(3);

      //check for equal to rounded lat and lng
      let tilingRef = db
        .collection("aggregatedGeoTiling")
        .where("roundedLatitude", "==", roundedLat);
      hazardRef.where("roundedLongitude", "==", roundedLng);

      tilingRef
        .get()
        .then(
          //just update tally if found
          (querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log("Incrementing tally!");
              const docRef = db.collection("aggregatedGeoTiling").doc(doc.id);
              docRef.update({
                count: firebase.firestore.FieldValue.increment(1),
              });
              console.log("successfully incremented geotiling aggregate!");
              return res.status(200).send({ message: "success tally" });
              throw new Error("Tallied!");
            });
          }
        )
        .then(
          //make new aggregated geotiling document if none there yet
          db
            .collection("aggregatedGeoTiling")
            .add({
              latitude: roundedLat,
              longitude: roundedLng,
              count: 1,
            })
            .then(() => {
              return res.status(200).send({ message: "success new aggregate" });
            })
        );
    });

  //catch errors
});

/*TODO for future development: Move all client-side database stuff to our backend-server,
add in the rest of the functions we have outlined! (googlemaps autocomplete, here api, etc)*/
