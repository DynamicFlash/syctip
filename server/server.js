let express = require('express');
let http =require('http');
let path = require('path');
let socketIO = require('socket.io');
const {admin} = require('./utils/connect/connect-admin');
var qdata;
var uid = 'Vv4QMQ9H70NM92cZwSgoPn8ys7z1';
//console.log(hbs);

//const {login} = require('./utils/auth/firebase-connect')
const {getFile} = require('./utils/admin/admin-json');
const {getAllFac} = require('./utils/admin/admin-all')
const {writeDb} = require('./utils/db/getpi-db');
const {newUser,piNewUser} = require('./utils/admin/admin-function');
const {delByName} = require('./utils/admin/admin-delete');
const {upByName} = require('./utils/admin/admin-update');
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

	socket.on('piDelete',(data)=>{

		if(data.auid == uid){
		delByName(data.auid, data.name,getFile(`${data.depart}`),data.depart,socket).catch((err)=>{
			console.log(err);
			});
		}else{
			socket.emit('serverStatus',{status : `false`})
		}
	})


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


	socket.on('adminCheck',(data)=>{
		console.log(data);
		console.log(`uid :${data}, admin UId : BMY2y3SZx5PSUsOElzp0SV5tO842 `)
		if(`${data}` == uid){
			socket.emit('admin',{status : `true`})
		}
		else{
		socket.emit('admin',{status : `false`})
		}
	})

	socket.on('adminNew',(data)=>{
		
		if(`${data.uid}` == uid){
		newUser(socket,data).catch((err)=>{
			console.log(err);
			})
		}else{
			socket.emit('userStatus',{status : `false`});
		}
	})

	socket.on('adminDelete',(data)=>{

		if(data.auid == uid){
		// delByName(data.auid, data.name,getFile(`${data.depart}`),data.depart,socket).catch((err)=>{
		// 	console.log(err);
		// 	});
		
		socket.emit('piRegDel', data);

		}else{
			socket.emit('serverStatus',{status : `false`})
		}
	})


	socket.on('userPass',(data)=>{
		userPass(socket,data).catch((err)=>{
			console.log(err);
		})
	})

	socket.on('userResetPass',(data)=>{
		userResetPass(socket,data).catch((err)=>{
			console.log(err);
		})
	})


	socket.on('adminUpdate',(data)=>{
		console.log("this is from socket", data)
		if(data.uid==uid){
		upByName(data.name,getFile(`${data.depart}`),data.depart,data.month,data.date,data.uf,data.time,socket).catch((err)=>{
			console.log(err);
			});
		}else{
			 socket.emit('serverStatus',{status : 'false'});
		}
	});


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
		var uid = data.uid;
		console.log(`month : ${info}, uid : ${uid}`);
		pushData(socket,uid,info).catch((err)=>{
			console.log(err)
		});
	});

	socket.on('getFac',(data)=>{

	if(data.uid==uid){
		getAllFac(data.depart, socket)
	}
	else{
		socket.emit('serverStatus',{status : `false`})
	}
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
