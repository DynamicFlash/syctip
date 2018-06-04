const {firebase} =require('./admin-firebase');
const {admin} = require('./../connect/connect-admin');

var userPass = async function(user, socket, data){
user.updatePassword(data.password).then(function() {
  socket.emit('serverStatus',{status : `true`});
}).catch(function(error) {
  socket.emit('serverStatus',{status : `false`});
});
}

var userResetPass = async function(data){
auth.sendPasswordResetEmail(data.email).then(function() {
  socket.emit('serverStatus',{status : `true`});.
}).catch(function(error) {
  socket.emit('serverStatus',{status : `false`});
});
}

module.exports ={userPass,userResetPass};