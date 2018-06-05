const {admin} = require('./../connect/connect-admin');
//const firebase = require('firebase');
const {db} = require('./../connect/connect-admin-firestore');
const {toDate,getMon} = require('./../db/functions');


// var config = {
//     apiKey: "AIzaSyDO6U1xTMXupPPyPF6fmp91jk42cBc6g_I",
//     authDomain: "attendance-196708.firebaseapp.com",
//     databaseURL: "https://attendance-196708.firebaseio.com",
//     projectId: "attendance-196708",
//     storageBucket: "attendance-196708.appspot.com",
//     messagingSenderId: "276986098297"
//   };
//   firebase.initializeApp(config);

const {firebase} =require('./admin-firebase');





var newUser = async function(socket,user){
var userRecord = await admin.auth().createUser({
  email: `${user.email}`,
  emailVerified: false,
  password: `${user.password}`,
  displayName: `${user.name}`,
  disabled: true
}).catch(function(error) {
    console.log("Error creating new user:", error);
    Promise.reject(error);
  });
	
	data ={uid : `${userRecord.uid}`,
					 name : `${userRecord.displayName}`}
	Promise.resolve(socket.emit('piReg',data));
}

var piNewUser = async function(socket ,data){
	var date = new Date();
	console.log("month : ", getMon(`${date.getMonth()+1}`) ,` date : ${date.getDate()}`,` time : ${date.toLocaleTimeString()}`);
	
	if(data != null){
  		var setDoc = await db.collection('users').doc(data.uid).collection(getMon(`${date.getMonth()+1}`)).doc(`${date.getDate()}`).set({regtime :`${date.toLocaleTimeString()}`}).catch((err)=>{stat=false});
  		//var setDoc = await db.collection('users').doc('testUser').set({name : data }).catch((err)=>{console.log(err)});
  		//var setDoc = await db.collection('users').doc('testUser').collection(getMon(date.getMonth())).catch((err)=>{stat=false});
  		admin.auth().updateUser(data.uid, {disabled: false})
  		Promise.resolve(socket.emit('userStatus',{name :`${data.name}`,status : `true`}));
  		console.log("done")
	}
	else
		Promise.reject(socket.emit('userStatus',{status : `false`}));
}

// getMon(`${date.getMonth()}`)


// admin.auth().createUser({
//   email: "aldrin.a.fernandes@gmail.com",
//   emailVerified: false,
//   phoneNumber: "+11234567890",
//   password: "secretPassword",
//   displayName: "John Doe",
//   photoURL: "http://www.example.com/12345678/photo.png",
//   disabled: false
// })
//   .then(function(userRecord) {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log("Successfully created new user:", userRecord.displayName);
//     firebase.auth().sendPasswordResetEmail("aldrin.a.fernandes@gmail.com").then(function() {
//   console.log("email.send");
// }).catch(function(error) {
//   // An error happened.
// });
//   })
//   .catch(function(error) {
//     console.log("Error creating new user:", error);
//   });


module.exports ={newUser,piNewUser}