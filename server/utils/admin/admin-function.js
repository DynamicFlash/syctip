const {admin} = require('./../connect/connect-admin');
const firebase = require('firebase');


var config = {
    apiKey: "AIzaSyDO6U1xTMXupPPyPF6fmp91jk42cBc6g_I",
    authDomain: "attendance-196708.firebaseapp.com",
    databaseURL: "https://attendance-196708.firebaseio.com",
    projectId: "attendance-196708",
    storageBucket: "attendance-196708.appspot.com",
    messagingSenderId: "276986098297"
  };
  firebase.initializeApp(config);

// var newUser= async function(socket,user){
// var userRecord = await admin.auth().createUser({
//   email: `${user.email}`,
//   emailVerified: false,
//   password: `${user.password}`,
//   displayName: `${user.name}`,
//   disabled: true
// }).catch(function(error) {
//     console.log("Error creating new user:", error);
//   });
// socket.emit('piReg',userRecord.displayName);

// }

admin.auth().createUser({
  email: "aldrin.a.fernandes@gmail.com",
  emailVerified: false,
  phoneNumber: "+11234567890",
  password: "secretPassword",
  displayName: "John Doe",
  photoURL: "http://www.example.com/12345678/photo.png",
  disabled: false
})
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully created new user:", userRecord.displayName);
    firebase.auth().sendPasswordResetEmail("aldrin.a.fernandes@gmail.com").then(function() {
  console.log("email.send");
}).catch(function(error) {
  // An error happened.
});
  })
  .catch(function(error) {
    console.log("Error creating new user:", error);
  });

