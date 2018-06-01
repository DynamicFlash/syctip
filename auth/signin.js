const {admin} = require('./../connect/connect-admin');
//const access = require('./firebase-connect')


// admin.auth().signInWithEmailAndPassword('aldrin.a.fernandes@gmail.com', 'qwerty').then((user)=> {
// console.log("logged in");
// }).catch((err)=>{
//   console.log("this is not working");
// });

admin.auth().verifyIdToken(idToken)
  .then(function(decodedToken) {
    var uid = decodedToken.uid;
    // ...
  }).catch(function(error) {
    // Handle error
  });