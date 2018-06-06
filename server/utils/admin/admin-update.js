const {firebase} =require('./admin-firebase');
const {admin} = require('./../connect/connect-admin');
const {db} = require('./../connect/connect-admin-firestore');
var fs = require('fs');

var updateUser = async function (depart,uid,month,date,uf,time,socket){

	//console.log(data);
	//console.log("i am here")
	if(uf == 'mtime'){
	db.collection(`${depart}`).doc(uid).collection(month).doc(date).update({mtime :`${time}`}).then((user)=>{
	socket.emit('serverStatus',{status : `true`});
	}).catch((err)=>{
	socket.emit('serverStatus',{status : `false`});
	});
	
	}

	if(uf == 'atime'){
	db.collection(`${depart}`).doc(uid).collection(month).doc(date).update({atime :`${time}`}).then((err)=>{
	socket.emit('serverStatus',{status : `true`});
	}).catch((err)=>{
	socket.emit('serverStatus',{status : `false`})
	});
	}

	if(uf == 'etime'){
	db.collection(`${depart}`).doc(uid).collection(month).doc(date).update({etime :`${time}`}).then((err)=>{
	socket.emit('serverStatus',{status : `true`});
	}).catch((err)=>{
	socket.emit('serverStatus',{status : `false`})
	});
	}
	

}


var upByName = async function(name,filename,depart,month,date,uf,time,socket){
  console.log('name : ',name ,' filename :',filename ,' depart: ' ,depart ,' month:',month , 'date :', date,' time: ', time );
  fs.readFile(filename ,'utf8' ,(err, data) => {
    
    if(err){
      socket.emit('serverStatus',{status : 'false'});
    }
    else
    { var uid;
      var json = JSON.parse(data);
      //console.log(json.users)
          for(var i=0;i<json.users.length;i++){
            console.log(`Name: ${json.users[i].name}, uid : ${json.users[i].uid}`);
              if(json.users[i].name==name){
                uid=json.users[i].uid
                console.log(uid);
              break;
              }
          }
          updateUser(depart,uid,month,date,uf,time,socket).catch((err)=>{
          	console.log(err);
          });
      }
  });
}



module.exports = {upByName}