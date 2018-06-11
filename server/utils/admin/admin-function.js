const {admin} = require('./../connect/connect-admin');
//const firebase = require('firebase');
const {getFile,facRead,facWrite,facDel} = require('./admin-json');
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





var newUser = async function(socket,user,socketC){
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
					 name : `${userRecord.displayName}`,
           depart : `${user.depart}`}
  console.log(data);
	Promise.resolve(socketC.emit('piReg',JSON.stringify(data)));
}

var piNewUser = async function(socket ,data){
	var date = new Date();
  data = JSON.parse(data)
	console.log("depart :",`${data.depart}`,"month : ", getMon(`${date.getMonth()+1}`) ,` date : ${date.getDate()}`,` time : ${date.toLocaleTimeString()}`);
	console.log(`file ${getFile(data.depart)}`)
	if(data != null){
  		var setDoc = await db.collection(data.depart).doc(data.uid).collection(getMon(`${date.getMonth()+1}`)).doc(`${date.getDate()}`).set({regtime :`${date.toLocaleTimeString()}`}).catch((err)=>{stat=false});
  		//var setDoc = await db.collection('users').doc('testUser').set({name : data }).catch((err)=>{console.log(err)});
  		//var setDoc = await db.collection('users').doc('testUser').collection(getMon(date.getMonth())).catch((err)=>{stat=false});
  		admin.auth().updateUser(data.uid, {disabled: false})
      var obj = await facWrite(getFile(data.depart),{name: `${data.name}`,uid : `${data.uid}`});
  		Promise.resolve(socket.emit('userStatus',{name :`${data.name}`,status : `true`}));
  		console.log("done")
	}
	else
		Promise.reject(socket.emit('userStatus',{status : `false`}));
}


module.exports ={newUser,piNewUser}