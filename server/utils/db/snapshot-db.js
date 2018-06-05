const {db} = require('./../connect/connect-admin-firestore');
const {admin} = require('./../connect/connect-admin');
//var db = admin.database();

  var data = {}; 
// var data ={};
// var user = 'aldrinFernandes';
// var month = 'july'

// var path = db.collection('users').doc('aldrinFernandes').collection('june');

// path.get().then(function(querySnapshot) {
// 	console.log(typeof(querySnapshot))
//     querySnapshot.forEach(function(doc) {
//          data[doc.id]=doc.data() //is never undefined for query doc snapshots
//         //console.log(doc.id, " => ", doc.data());
//     });
//     console.log(data)
// });


// We start an 'async' function to use the 'await' keyword
async function pushData(socket, uid, month){
  // var result = await admin.auth().getUser(kuid);
  // console.log(result);
  // socket.emit('users',result)
  console.log(`month : ${month}, uid : ${uid}`);
  var path = db.collection('users').doc(uid).collection(month);

  var querySnapshot = await path.get().catch((err)=>{
  	console.log(err)
  });
    querySnapshot.forEach(function(doc) {
         data[doc.id]=doc.data() //is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
    });
    //console.log(data)
    Promise.resolve(socket.emit('mData',data));
    data={};
}

module.exports = {pushData};