let express = require('express');
let http =require('http');
let path = require('path');
let socketIO = require('socket.io');
const {admin} = require('./utils/connect/connect-admin');
var qdata;
//console.log(hbs);

//const {login} = require('./utils/auth/firebase-connect')
const {writeDb} = require('./utils/db/getpi-db');
const {newUser,piNewUser} = require('./utils/admin/admin-function');
const {deleteUser} = require('./utils/admin/admin-delete');
const {updateUser} = require('./utils/admin/admin-update');
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

	socket.on('piNewUser',(data)=>{
		piNewUser(socket,data).catch((err)=>{
			console.log(err);
		})
	})

	socket.on('adminNew',(data)=>{
		console.log(data);
		newUser(socket,data).catch((err)=>{
			console.log(err);
		})
	})


	socket.on('adminDelete',(data)=>{
		deleteUser('BMY2y3SZx5PSUsOElzp0SV5tO842', data.uid, socket).catch((err)=>{
			console.log(err);
		});
	})

	socket.on('adminUpdate',(data)=>{
		//console.log("this is from socket", data)
		updateUser('BMY2y3SZx5PSUsOElzp0SV5tO842', data, socket).catch((err)=>{
			console.log(err);
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
