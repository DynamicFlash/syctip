const {db} = require('./../connect/connect-admin-firestore');
const {admin} = require('./../connect/connect-admin');
//var db = admin.database();

  var data = {}; 



// We start an 'async' function to use the 'await' keyword
async function pushData(socket, uid, month){
  console.log(`month : ${month}, uid : ${uid}`);
  var path = db.collection('users').doc(uid).collection(month);

  var querySnapshot = await path.get().catch((err)=>{
  	console.log(err)
  });
    querySnapshot.forEach(function(doc) {
         data[doc.id]=doc.data() 
    });
    Promise.resolve(socket.emit('mData',data));
    data={};
}




module.exports = {pushData};