var {admin, defaultApp} = require("./../connect/connect-admin");
var firebase = require("firebase");
var func = require('firebase-functions');

//console.log(firebase);

 var config = {
    apiKey: "AIzaSyDO6U1xTMXupPPyPF6fmp91jk42cBc6g_I",
    authDomain: "attendance-196708.firebaseapp.com",
    databaseURL: "https://attendance-196708.firebaseio.com",
  };

var defaultApp = firebase.initializeApp(config);
var token;

//console.log(typeof(firebase.auth())) // Undefined
//console.log(typeof(defaultApp.auth())) // Function


var login = function(email , password){
firebase.auth().signInWithEmailAndPassword(email,password)
.then((user) => { // https://firebase.google.com/docs/reference/js/firebase.User
    let uid = user.uid;
    console.log(uid);
    return uid
    // set cookie with UID or some other form of persistence
    // such as the Authorization header
    // res.cookie('__session', { uid: uid }, { signed: true, maxAge: 3600 });
    // res.set('cache-control', 'max-age=0, private') // may not be needed. Good to have if behind a CDN.
    // res.send('You have successfully logged in');
  }).catch((e)=>{
    return false ;
  })

}

//login('aldrin.a.fernandes@gmail.com','qwerty');

module.exports ={login};