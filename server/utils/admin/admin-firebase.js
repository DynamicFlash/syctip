const firebasec = require('firebase');
var config = {
    apiKey: "AIzaSyDO6U1xTMXupPPyPF6fmp91jk42cBc6g_I",
    authDomain: "attendance-196708.firebaseapp.com",
    databaseURL: "https://attendance-196708.firebaseio.com",
    projectId: "attendance-196708",
    storageBucket: "attendance-196708.appspot.com",
    messagingSenderId: "276986098297"
  };
 var firebase = firebasec.initializeApp(config);

 module.exports ={firebase};
