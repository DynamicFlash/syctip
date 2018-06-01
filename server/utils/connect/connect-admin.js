
var admin = require("firebase-admin");

var serviceAccount = require("./../Keys/serviceAccountKey.json");

var defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://attendance-196708.firebaseio.com",
  storageBucket: "attendance-196708.appspot.com" 
})

//console.log(admin);
module.exports = {admin, defaultApp};


//webclient SDK
//276986098297-peuc6e66snqcqb41a6gjo75dhm8j162g.apps.googleusercontent.com

// admin.auth().createUser({
//   email: "aldrin.a.fernandes@gmail.com.com",
//   emailVerified: false,
//  password: "12345678",
//   displayName: "Aldrin",
//   disabled: false
// })
//   .then(function(userRecord) {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log("Successfully created new user:", userRecord.uid);
//   })
//   .catch(function(error) {
//     console.log("Error creating new user:", error);
//   });