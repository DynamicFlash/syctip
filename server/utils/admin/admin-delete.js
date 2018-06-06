const {firebase} =require('./admin-firebase');
const {admin} = require('./../connect/connect-admin');
const {db} = require('./../connect/connect-admin-firestore');
const {getFile,facRead,facWrite,facDel} = require('./admin-json')
const {toDate,getMon} = require('./../db/functions');
var fs = require('fs');

function deleteCollection(db, collectionPath, batchSize) {
  var collectionRef = db.collection(collectionPath);
  var query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
}

function deleteQueryBatch(db, query, batchSize, resolve, reject) {
  query.get()
      .then((snapshot) => {
        // When there are no documents left, we are done
        if (snapshot.size == 0) {
          return 0;
        }

        // Delete documents in a batch
        var batch = db.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });

        return batch.commit().then(() => {
          return snapshot.size;
        });
      }).then((numDeleted) => {
        if (numDeleted === 0) {
          resolve();
          return;
        }

        process.nextTick(() => {
          deleteQueryBatch(db, query, batchSize, resolve, reject);
        });
      })
      .catch(reject);
}

async function getDelData(db, collectionPath, batchSize){
	var data ={};
  
  var path = db.collection(collectionPath);
  var querySnapshot = await path.get().catch((err)=>{
  	console.log(err)
  });
    querySnapshot.forEach(function(doc) {
         data[doc.id]=doc.data() 
    });

    if(data !=null){
  deleteCollection(db, collectionPath, batchSize)
	};
}


 var deleteUser = async function(auid, uid,depart,socket){

 	if (auid != uid){
 	var month;
 	var batchSize = 10;

 	for(var i = 1;i<=12; i ++)
	{
		month = getMon(`${i}`);
		var collectionPath = `${depart}/${uid}/${month}`;
    console.log(collectionPath);
 		var coop =await getDelData(db, collectionPath, batchSize).catch((err)=>{
 		socket.emit('serverStatus',{status : `false`})
 		});
	}

		var coop = await admin.auth().deleteUser(`${uid}`).catch(function(error) {
 		console.log("Error deleting user:", error);
  		});
    facDel(getFile(`${depart}`),uid,depart,socket);
    socket.emit('serverStatus',{status : `true`});
 }else{
 	socket.emit('serverStatus',{status : `false`})
 }
}

var delByName = async function(auid,name,filename,depart,socket){
  
  fs.readFile(filename ,'utf8' ,(err, data) => {
    
    if(err){
      socket.emit('serverStatus',{status : 'false'});
    }
    else
    { var uid
      var json = JSON.parse(data);
      console.log(json.users)
          for(var i=0;i<json.users.length;i++){
            console.log(`Name: ${json.users[i].name}, uid : ${json.users[i].uid}`);
              if(json.users[i].name==name){
                uid=json.users[i].uid
                console.log(uid);
              break;
              }
          }
          console.log(uid);
          console.log(auid);
          deleteUser(auid, uid,depart,socket);
          socket.emit('serverStatus',{status : 'true'});
      }
  });
}

 module.exports ={delByName};