const {firebase} =require('./admin-firebase');
const {admin} = require('./../connect/connect-admin');
const {db} = require('./../connect/connect-admin-firestore');
const {toDate,getMon} = require('./../db/functions')

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


 var deleteUser = async function(auid, uid, socket){

 	if (auid != uid){
 	var month;
 	var batchSize = 10;

 	for(var i = 1;i<=12; i ++)
	{
		month = getMon(`${i}`);
		var collectionPath = `users/${uid}/${month}`;
 		getDelData(db, collectionPath, batchSize).then((err)=>{
		socket.emit('serverStatus',{status : `true`});
		}).catch((err)=>{
 		socket.emit('serverStatus',{status : `false`})
 		});
	}

		admin.auth().deleteUser(uid).then((err)=>{
		socket.emit('serverStatus',{status : `true`});
		}).catch(function(error) {
 		console.log("Error deleting user:", error);
  		});
 }else{
 	socket.emit('serverStatus',{status : `false`})
 }
}

 module.exports ={deleteUser};