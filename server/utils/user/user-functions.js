const {firebase} =require('./../admin/admin-firebase');
const {admin} = require('./../connect/connect-admin');

var userPass = async function(socket, data){
var user = data.user;
user.updatePassword(data.password).then(function() {
  socket.emit('serverStatus',{status : `true`});
}).catch(function(error) {
  socket.emit('serverStatus',{status : `false`});
});
}

var userResetPass = async function(socket , data){
firebase.auth().sendPasswordResetEmail(data).then(function() {
  socket.emit('serverStatus',{status : `true`});
}).catch(function(error) {
  socket.emit('serverStatus',{status : `false`});
});
}


module.exports ={userPass,userResetPass};