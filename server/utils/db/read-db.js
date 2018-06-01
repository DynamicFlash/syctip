const {db} = require('./../connect/connect-admin-firestore');
const {admin} = require('./../connect/connect-admin');
//console.log(admin)
//let socketIO = require('socket.io');

var uName;

uid = 'proQ1RP07Ne2b7qweOdd881WNhA3'

// var getUserInfo = async function(uid)
// {
// 	let uname = await admin.auth().getUser(uid).then(function(userRecord) {
//    	uid = userRecord;
//    	return uid;
//   })	
// }

// let kate = getUserInfo(uid);
// console.log(kate);


// Example function that returns a Promise that will resolve after 2 seconds
var getGenres = function() {
  return new Promise(function(resolve) {
    setTimeout(function(){
      resolve(['comedy', 'drama', 'action'])
    }, 2000);
  });
}


async function getData(socket, kuid){
  var result = await admin.auth().getUser(kuid);
  //console.log(result);
  socket.emit('users',result)
}

module.exports = {getData};