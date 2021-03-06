import firebase from "firebase";
import apiKeys from "../config/apiKeys";
import * as Google from "expo-google-app-auth";
let app;
if (!firebase.apps.length) app = firebase.initializeApp(apiKeys.firebaseConfig);
else app = firebase.app();
let db = firebase.firestore();
export { db };
console.log("Firebase set up!");

const isUserEqual = (googleUser, firebaseUser) => {
  if (googleUser.getBasicProfile && firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
};

const onSignIn = (googleUser) => {
  console.log("Google Auth Response", googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.

      const credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );

      // Sign in with credential from the Google user.
      console.log(credential);
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(function (result) {
          console.log("Signed in!");

          if (result.additionalUserInfo.isNewUser) {
            setProfile(result);
          }
        })
        .catch(function (error) {
          // Handle Errors here.
          console.log("error signing in");
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    } else {
      console.log("User already signed-in Firebase.");
    }
  });
};

export async function anonymousLogin() {
  firebase
    .auth()
    .signInAnonymously()
    .then((result) => {
      console.log("Anonymously signed in!");
      if (result.additionalUserInfo.isNewUser) {
        setAnonymousProfile(result);
      }
    })
    .catch(function (error) {
      // Handle Errors here.
      console.log("error signing in");
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}

function setAnonymousProfile(result) {
  db.collection("users").doc(result.user.uid).set({
    uid: result.user.uid,
    profilePic: "https://static.thenounproject.com/png/538846-200.png",
    displayName: "Anonymous User",
    email: "N/A",
  });
}

export async function login() {
  try {
    const result = await Google.logInAsync({
      androidClientId: apiKeys.authClient.androidID,
      iosClientId: apiKeys.authClient.iosID,
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      onSignIn(result);

      return result.accessToken;
    } else {
      console.log("Cancelled");
    }
  } catch (e) {
    console.log("error");
  }
}

function setProfile(result) {
  db.collection("users").doc(result.user.uid).set({
    uid: result.user.uid,
    profilePic: result.user.photoURL,
    displayName: result.user.displayName,
    email: result.user.email,
  });
}

export async function logout() {
  try {
    firebase.auth().signOut();
  } catch (e) {
    console.error(e);
  }
}
