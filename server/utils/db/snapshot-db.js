//const {db} = require('./../connect/connect-admin-firestore');
const {admin} = require('./../connect/connect-admin');
const {getFile} = require('./../admin/admin-json')
var fs = require('fs');
//var db = admin.database();
//console.log(db);

 // var data = {}; 



// We start an 'async' function to use the 'await' keyword
// async function pushData(socket, uid, month){
//   console.log(`month : ${month}, uid : ${uid}`);
//   var path = db.collection('users').doc(uid).collection(month);

//   var querySnapshot = await path.get().catch((err)=>{
//   	console.log(err)
//   });
//     querySnapshot.forEach(function(doc) {
//          data[doc.id]=doc.data() 
//     });
//     Promise.resolve(socket.emit('mData',data));
//     data={};
// }

async function pushAdminData(name,month,socket,db){
//console.log(db);
var depart = ['C', 'E','M'];
for(var j = 0;j<depart.length;j++){
  console.log(`${getFile(depart[j])} : ${depart[j]}`);
var trick = await dataByName(name,getFile(depart[j]),depart[j],month,socket,db);
  }
}

var dataByName = async function(name,filename,depart,month,socket,db){
  var d= db
  console.log(d)
  fs.readFile(filename ,'utf8' ,(err, data) => {
    
    if(err){
      err
    }
    else
    { 
      var json = JSON.parse(data);
      //console.log(json.users)
          for(var i=0;i<json.users.length;i++){
            console.log(`Name: ${json.users[i].name}, uid : ${json.users[i].uid}`);
              if(`${json.users[i].name}`== name){
                console.log(`depart : ${depart},Name : ${json.users[i].name} UID :  ${json.users[i].uid} month : ${month}`);
                  //var qwert = sendData(depart,uid,month,d);
                 db.collection(depart).doc(json.users[i].uid).collection(month).get().then((querySnapshot)=>{
                    var dataDb={}
                    querySnapshot.forEach(function(doc) {
                    dataDb[doc.id]=doc.data() 
                      })
                socket.emit('mData',dataDb)
                  }).catch((err)=>{console.log(err)});

               Promise.resolve(depart);
              break;
              }
          }
        //   if(d !=null){
        //   socket.emit('serverStatus',{status : 'true'});
        // }
      }
  });
}


async function pushData(uid,month,socket,db){
//console.log(db);
var depart = ['C', 'E','M'];
for(var j = 0;j<depart.length;j++){
  console.log(`${getFile(depart[j])} : ${depart[j]}`);
var trick = await dataByUid(uid,getFile(depart[j]),depart[j],month,socket,db);
  }
}

async function sendData(depart,uid,month){
  var data = {}

  return new Promise(function(resolve,reject){
    var data;
    db.collection(depart).doc(uid).collection(month).get().then((querySnapshot)=>{
          querySnapshot.forEach(function(doc) {
           data[doc.id]=doc.data() 
         })
    socket.emit('mData',data)
    resolve(data)
    console.log(data);
    }).catch((err)=>{reject(err)});


  });
    
}





var dataByUid = async function(uid,filename,depart,month,socket,db){
  var d= db
  console.log(d)
  fs.readFile(filename ,'utf8' ,(err, data) => {
    
    if(err){
      err
    }
    else
    { 
      var json = JSON.parse(data);
      //console.log(json.users)
          for(var i=0;i<json.users.length;i++){
            console.log(`Name: ${json.users[i].name}, uid : ${json.users[i].uid}`);
              if(`${json.users[i].uid}`==uid){
                console.log(`depart : ${depart},UID :  ${json.users[i].uid} month : ${month}`);
                  //var qwert = sendData(depart,uid,month,d);
                 db.collection(depart).doc(uid).collection(month).get().then((querySnapshot)=>{
                    var dataDb={}
                    querySnapshot.forEach(function(doc) {
                    dataDb[doc.id]=doc.data() 
                      })
                socket.emit('mData',dataDb)
                  }).catch((err)=>{Promise.reject(err)});

               Promise.resolve(depart);
              break;
              }
          }
        //   if(d !=null){
        //   socket.emit('serverStatus',{status : 'true'});
        // }
      }
  });
}




module.exports = {pushData,pushAdminData};