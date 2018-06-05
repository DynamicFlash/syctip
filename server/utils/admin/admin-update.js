const {firebase} =require('./admin-firebase');
const {admin} = require('./../connect/connect-admin');
const {db} = require('./../connect/connect-admin-firestore');


var updateUser = async function (data , socket){

	console.log(data);
	//console.log("i am here")
	if(data.uf == 'mtime'){
	db.collection('users').doc(data.uid).collection(data.month).doc(data.date).update({mtime :`${data.time}`}).then((user)=>{
	socket.emit('serverStatus',{status : `true`});
	}).catch((err)=>{
	socket.emit('serverStatus',{status : `false`});
	});
	
	}

	if(data.uf == 'atime'){
	db.collection('users').doc(data.uid).collection(data.month).doc(data.date).update({atime :`${data.time}`}).then((err)=>{
	socket.emit('serverStatus',{status : `true`});
	}).catch((err)=>{
	socket.emit('serverStatus',{status : `false`})
	});
	}

	if(data.uf == 'etime'){
	db.collection('users').doc(data.uid).collection(data.month).doc(data.date).update({etime :`${data.time}`}).then((err)=>{
	socket.emit('serverStatus',{status : `true`});
	}).catch((err)=>{
	socket.emit('serverStatus',{status : `false`})
	});
	}
	

}


module.exports = {updateUser}