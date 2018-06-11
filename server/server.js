let express = require('express');
let http =require('http');
let path = require('path');
let socketIO = require('socket.io');
const {admin} = require('./utils/connect/connect-admin');
var qdata;
var pyio = require('socket.io-client')
var socketC= pyio.connect('http://localhost:5000', { transports: ['websocket', 'polling'] });
var uid = 'Vv4QMQ9H70NM92cZwSgoPn8ys7z1';
var uide = 'cogd9PbgzOd4bWmxbvWc8JC7SGK2';
var uidc = 'tfUUcmiiUwSr28k9jYaHByX9dWe2';
var uidm = 'sBn2212RTNdyeetmO0dOG9uSDmq2';

//console.log(hbs);

//const {login} = require('./utils/auth/firebase-connect')
const {userPass,userResetPass}=require('./utils/user/user-functions');
const {db} = require('./utils/connect/connect-admin-firestore');
const {getFile} = require('./utils/admin/admin-json');
const {getAllFac} = require('./utils/admin/admin-all')
const {writeDb} = require('./utils/db/getpi-db');
const {newUser,piNewUser} = require('./utils/admin/admin-function');
const {delByName} = require('./utils/admin/admin-delete');
const {upByName} = require('./utils/admin/admin-update');
const {pushData,pushAdminData} = require('./utils/db/snapshot-db');
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
	
	// socket.on('piOnlineStatus',function(data){
	// 	console.log('pi is connected');
	// 	socket.emit('piOnline',true);
	// });

socketC.emit('connect',true);

socketC.on('piOnlineStatus',function(data){
	console.log('pi is connected');
	socket.emit('piOnline',true);
});

socketC.on('piOfflineStatus',function(data){
	console.log('pi is disconnected');
	// socket.emit('piOnline',true);
});

	socketC.on('piDelete',(data)=>{
		data=JSON.parse(data)
		console.log(data);
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

	socketC.on('piNewUser',(data)=>{
		piNewUser(socket,data).catch((err)=>{
			console.log(err);
		})
	})


	socket.on('adminCheck',(data)=>{
		console.log(data);
		console.log(`uid :${data}, admin UId : BMY2y3SZx5PSUsOElzp0SV5tO842 `)
		if(`${data}` == uid || `${data}` == uide ||`${data}` == uidc||`${data}` == uidm){
			socket.emit('admin',{status : `true`})
		}
		else{
		socket.emit('admin',{status : `false`})
		}
	})

	socket.on('adminNew',(data)=>{
		
		if(`${data.uid}` == uid){
		newUser(socket,data,socketC).catch((err)=>{
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
		console.log(data)
		socketC.emit('piRegDel',JSON.stringify(data));

		}

		else{
			socket.emit('serverStatus',{status : `false`})
		}
	})


	socket.on('userPass',(data)=>{
		console.log(data)
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
			})
		}
		else if(data.uid==uide){
		upByName(data.name,getFile('E'),'E',data.month,data.date,data.uf,data.time,socket).catch((err)=>{
			console.log(err);
			})
		}
		else if(data.uid==uidc){
		upByName(data.name,getFile('C'),'C',data.month,data.date,data.uf,data.time,socket).catch((err)=>{
			console.log(err);
			})
		}
		else if(data.uid==uidm){
		upByName(data.name,getFile('M'),'M',data.month,data.date,data.uf,data.time,socket).catch((err)=>{
			console.log(err);
			})

		}

		else{
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
		console.log(db);
		console.log(`month : ${info}, uid : ${uid}`);
		pushData(uid,info,socket,db).catch((err)=>{
			console.log(err)
		});
	});

	socket.on('adminGetM',(data)=>{
		var info = data.month;
		if(data.uid == uid){
		console.log(`month : ${data.month}, name : ${data.name}, month : ${data.month}`);
		pushAdminData(data.name,data.month,socket,db).catch((err)=>{
			console.log(err)
			});
		}

		if(data.uid == uide){
		console.log(`month : ${data.month}, name : ${data.name}, month : ${data.month}`);
		pushAdminData(data.name,data.month,socket,db).catch((err)=>{
			console.log(err)
			});
		}

		if(data.uid == uidm){
		console.log(`month : ${data.month}, name : ${data.name}, month : ${data.month}`);
		pushAdminData(data.name,data.month,socket,db).catch((err)=>{
			console.log(err)
			});
		}

		if(data.uid == uidc){
		console.log(`month : ${data.month}, name : ${data.name}, month : ${data.month}`);
		pushAdminData(data.name,data.month,socket,db).catch((err)=>{
			console.log(err)
			});
		}
	});


	socket.on('getFac',(data)=>{

	if(data.uid==uid){
		getAllFac(data.depart, socket)
	}
	else if(data.uid==uide){
		getAllFac('E', socket)
	}
	else if(data.uid==uidc){
		getAllFac('C', socket)
	}
	else if(data.uid==uidm){
		getAllFac('M', socket)
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
