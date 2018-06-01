let express = require('express');
let http =require('http');
let path = require('path');
let socketIO = require('socket.io');
const {admin} = require('./utils/connect/connect-admin');
var qdata;
//console.log(hbs);

//const {login} = require('./utils/auth/firebase-connect')
const {getData} = require('./utils/db/read-db')
const {generateMessage, generateLocationMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT||3000;
let app = express();
let server = http.createServer(app);
var io = socketIO(server);  

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
	console.log('new user connected');
	var d = new Date(); 
	var time = 	`${d.getHours()}: `+`${d.getMinutes()} :`+ `${d.getSeconds()}`;
	
	socket.emit('newMessage',generateMessage('Admin','welcome to chat app'));

	socket.on('getUid',(uid,callback)=>{
		var d = new Date(); 
		var time = 	`${d.getHours()}: `+`${d.getMinutes()} :`+ `${d.getSeconds()}`;
		var userId = uid.uid
		console.log('uid :', userId);

		getData(socket, userId).catch((error)=>{
			console.log(error)
		})

		// async function getData(kuid){
  // 		var result = await admin.auth().getUser(kuid);
  // 		socket.emit('users',result);
		// }

		// getData(function(data){qdata=data},uid.uid).catch((error)=>{
  // 		console.log(error)
  // });

		// setTimeout(
		// 	function(){console.log(qdata);
		// 	socket.emit('users',{uid :`${qdata}`})},1500)
	})


	socket.on('createLocationMessage', (coords)=>{
		//console.log(generateLocationMessage('admin',coords.latitude, coords.longitude))
		socket.broadcast.emit('newLocationMessage', generateLocationMessage('admin',coords.latitude, coords.longitude))
	})


	socket.on('createEmail',(newEmail)=>{
		console.log('Create email', newEmail);
	})


	socket.on('disconnect',()=>{
		console.log('user disconnected');
	})	
})


server.listen(port,()=>{
	console.log(`server is up on ${port}`)
});

// async function getData(callback, kuid){
//   var result = await admin.auth().getUser(kuid)
//   callback(result.uid)
  
// }
