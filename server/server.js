let express = require('express');
let http =require('http');
let path = require('path');
let socketIO = require('socket.io');
const {admin} = require('./utils/connect/connect-admin');
var qdata;
//console.log(hbs);

//const {login} = require('./utils/auth/firebase-connect')
const {writeDb} = require('./utils/db/getpi-db');
const {pushData} = require('./utils/db/snapshot-db');
const {getData} = require('./utils/db/read-db');
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
	
	socket.on('piOnlineStatus',function(data){
		console.log('pi is connected');
		socket.emit('piOnline',true);
	});

	socket.on('getPiData',(data)=>{
		writeDb(socket,data).catch((err)=>{
			console.log(err)
		});
	})

	socket.on('getUid',(uid,callback)=>{
		var d = new Date(); 
		var time = 	`${d.getHours()}: `+`${d.getMinutes()} :`+ `${d.getSeconds()}`;
		var userId = uid.uid
		console.log('uid :', userId);

		getData(socket, userId).catch((error)=>{
			console.log(err);
		})
	})

	socket.on('getM',(data)=>{
		var info = data.month;
		console.log(info);
		pushData(socket,'aldrinFernandes',info).catch((err)=>{
			console.log(err)
		});
	});

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
