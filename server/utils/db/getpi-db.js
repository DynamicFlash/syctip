const {db} = require('./../connect/connect-admin-firestore');
const {admin} = require('./../connect/connect-admin');
const {toDate,getMon} = require('./functions');


var writeDb = async function(socket,data){
console.log(data);
var thresh1 = toDate("11:45:00");
var thresh2 = toDate("14:45:00");
var thresh3= toDate("16:59:00");
var ref,stat=true;	

			ref = toDate(data.A.time);
			if(ref.getTime()<thresh1.getTime()){
			// for(var j =0;j<data.C.length;j++){
			// var setDoc = await db.collection(data.C[i]).doc(data.C[i].uid).collection(getMon(data[0].month)).doc(`${data.A.date}`).set({mtime :`${data.C[i].time}`}).catch((err)=>{stat=false});
			// console.log(" I am from the morning loop ",`${getMon(data[0].month)} : ${data[0].date}: time :${data[i].time}`);
				// }
			writeM(data, socket).catch((err)=>{
				console.log(err);
			});

			}
			else if(thresh1.getTime()<ref.getTime() && ref.getTime()<thresh2.getTime()){
			writeA(data, socket).catch((err)=>{
				console.log(err);
			});
			}
			else if(ref.getTime()>thresh3.getTime()){
			writeE(data, socket).catch((err)=>{
				console.log(err);
			});
			//var setDoc = await db.collection('users').doc(data[i].name).collection(getMon(data[0].month)).doc(`${data[0].date}`).update({etime :`${data[i].time}`}).catch((err)=>{stat=false});
			//console.log(" I am from the evening loop",`${getMon(data[0].month)} : ${data[0].date}: time :${data[i].time}`);
			}

	socket.emit('piStat', stat);
}

module.exports = {writeDb};


// var data = [

// 		{	date : "1",
// 			month: "12",
// 		 	time : "9:10:15"
// 		 },

// 		{
// 			name : "aldrinFernandes",
// 			time : "9:00:00"
// 		},

// 		{
// 			name : "subodhNaik",
// 			time : "8:14:00"
// 		},

// 		{
// 			name : "shubhamParab",
// 			time : "9:08:00"
// 		},

// 		{
// 			name : "budhajiGawas",
// 			time : "9:14:00"
// 		}
// 		]


var writeM= async function(data,socket){


for(var i =0;i<data.C.length;i++){

	var val = await db.collection('C').doc(data.C[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).get().catch((err)=>{stat=false});
	if (val.mtime==null && val.etime==null && val.atime==null ){
	var setDoc = await db.collection('C').doc(data.C[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).set({mtime :`${data.C[i].time}`}).catch((err)=>{stat=false});
	console.log(" I am from the morning loop ",`UID : ${data.C[i].uid}(${getMon(data.A.month)} : ${data.A.date}: time :${data.C[i].time})`);
		}else{
	var setDoc = await db.collection('C').doc(data.C[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).update({mtime :`${data.C[i].time}`}).catch((err)=>{stat=false});
	console.log(" I am from the morning loop ",`UID : ${data.C[i].uid}(${getMon(data.A.month)} : ${data.A.date}: time :${data.C[i].time})`);
		}
	}	


for(var i =0;i<data.E.length;i++){
	var val = await db.collection('E').doc(data.E[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).get().catch((err)=>{stat=false});
	if(val.mtime==null && val.etime==null && val.atime==null ){
	var setDoc = await db.collection('E').doc(data.E[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).set({mtime : `${data.E[i].time}`}).catch((err)=>{stat=false});
	console.log(" I am from the morning loop ",`UID : ${data.E[i].uid}(${getMon(data.A.month)} : ${data.A.date}: time :${data.E[i].time})`);
	}else{
	var setDoc = await db.collection('E').doc(data.E[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).update({mtime : `${data.E[i].time}`}).catch((err)=>{stat=false});
	console.log(" I am from the morning loop ",`UID : ${data.E[i].uid}(${getMon(data.A.month)} : ${data.A.date}: time :${data.E[i].time})`);
	}
}

for(var i =0;i<data.M.length;i++){

	var val = await db.collection('M').doc(data.M[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).get().catch((err)=>{stat=false});
	if(val.mtime==null && val.etime==null && val.atime==null ){
	var setDoc = await db.collection('M').doc(data.M[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).set({mtime :`${data.M[i].time}`}).catch((err)=>{stat=false});
	console.log(" I am from the morning loop ",`UID : ${data.M[i].uid}(${getMon(data.A.month)} : ${data.A.date}: time :${data.M[i].time})`);
		}else{
	var setDoc = await db.collection('M').doc(data.M[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).update({mtime :`${data.M[i].time}`}).catch((err)=>{stat=false});
	console.log(" I am from the morning loop ",`UID : ${data.M[i].uid}(${getMon(data.A.month)} : ${data.A.date}: time :${data.M[i].time})`);			
		}
	}
	socket.emit('serverStatus',{status : 'true'});
}

var writeA= async function(data,socket){


for(var i =0;i<data.C.length;i++){

	var val = await db.collection('C').doc(data.C[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).get().catch((err)=>{stat=false});
	if (val.atime==null){
	var setDoc = await db.collection('C').doc(data.C[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).update({atime :`${data.C[i].time}`}).catch((err)=>{stat=false});
	console.log(" I am from the afternoon loop ",`UID : ${data.C[i].uid}(${getMon(data.A.month)} : ${data.A.date}: time :${data.C[i].time})`);
		}else{
			continue;
		}
	}	


for(var i =0;i<data.E.length;i++){
	var val = await db.collection('E').doc(data.E[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).get().catch((err)=>{stat=false});
	if(val.atime==null){
	var setDoc = await db.collection('E').doc(data.E[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).update({atime : `${data.E[i].time}`}).catch((err)=>{stat=false});
	console.log(" I am from the afternoon loop ",`UID : ${data.E[i].uid}(${getMon(data.A.month)} : ${data.A.date}: time :${data.E[i].time})`);
	}else{
		continue;
	}
}

for(var i =0;i<data.M.length;i++){

	var val = await db.collection('M').doc(data.M[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).get().catch((err)=>{stat=false});
	if(val.atime==null){
	var setDoc = await db.collection('M').doc(data.M[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).update({atime :`${data.M[i].time}`}).catch((err)=>{stat=false});
	console.log(" I am from the afternoon loop ",`UID : ${data.M[i].uid}(${getMon(data.A.month)} : ${data.A.date}: time :${data.M[i].time})`);
		}else{
		continue;
		}
	}
	socket.emit('serverStatus',{status : 'true'});
}

var writeA= async function(data,socket){


for(var i =0;i<data.C.length;i++){

	var val = await db.collection('C').doc(data.C[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).get().catch((err)=>{stat=false});
	if (val.atime==null){
	var setDoc = await db.collection('C').doc(data.C[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).update({atime :`${data.C[i].time}`}).catch((err)=>{stat=false});
	console.log(" I am from the afternoon loop ",`UID : ${data.C[i].uid}(${getMon(data.A.month)} : ${data.A.date}: time :${data.C[i].time})`);
		}else{
			continue;
		}
	}	


for(var i =0;i<data.E.length;i++){
	var val = await db.collection('E').doc(data.E[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).get().catch((err)=>{stat=false});
	if(val.atime==null){
		var setDoc = await db.collection('E').doc(data.E[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).update({atime :`${data.E[i].time}`}).catch((err)=>{stat=false});
	console.log(" I am from the afternoon loop ",`UID : ${data.E[i].uid}(${getMon(data.A.month)} : ${data.A.date}: time :${data.E[i].time})`);
	}else{
		continue;
	}
}

for(var i =0;i<data.M.length;i++){

	var val = await db.collection('M').doc(data.M[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).get().catch((err)=>{stat=false});
	if(val.atime==null){
	var setDoc = await db.collection('M').doc(data.M[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).update({atime :`${data.M[i].time}`}).catch((err)=>{stat=false});
	console.log(" I am from the afternoon loop ",`UID : ${data.M[i].uid}(${getMon(data.A.month)} : ${data.A.date}: time :${data.M[i].time})`);
		}else{
		continue;
		}
	}
	socket.emit('serverStatus',{status : 'true'});
}


var writeE= async function(data,socket){


for(var i =0;i<data.C.length;i++){

	var val = await db.collection('C').doc(data.C[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).get().catch((err)=>{stat=false});
	if (val.etime==null){
	var setDoc = await db.collection('C').doc(data.C[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).update({etime :`${data.C[i].time}`}).catch((err)=>{stat=false});
	console.log(" I am from the evening loop ",`UID : ${data.C[i].uid}(${getMon(data.A.month)} : ${data.A.date}: time :${data.C[i].time})`);
		}else{
			continue;
		}
	}	


for(var i =0;i<data.E.length;i++){
	var val = await db.collection('E').doc(data.E[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).get().catch((err)=>{stat=false});
	if(val.etime==null){
	var setDoc = await db.collection('E').doc(data.E[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).update({etime : `${data.E[i].time}`}).catch((err)=>{stat=false});
	console.log(" I am from the evening loop ",`UID : ${data.E[i].uid}(${getMon(data.A.month)} : ${data.A.date}: time :${data.E[i].time})`);
	}else{
		continue;
	}
}

for(var i =0;i<data.M.length;i++){

	var val = await db.collection('M').doc(data.M[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).get().catch((err)=>{stat=false});
	if(val.etime==null){
	var setDoc = await db.collection('M').doc(data.M[i].uid).collection(getMon(data.A.month)).doc(`${data.A.date}`).update({etime :`${data.M[i].time}`}).catch((err)=>{stat=false});
	console.log(" I am from the evening loop ",`UID : ${data.M[i].uid}(${getMon(data.A.month)} : ${data.A.date}: time :${data.M[i].time})`);
		}else{
		continue;
		}
	}
	socket.emit('serverStatus',{status : 'true'});
}



// { 	A :{date : '1',
// 		month:'8',
// 		time: '09:10:15'},
// 	E :[{uid : '8Lu1sOeAl9UF20nu8Lj1UouXhGn2',
// 		  time: '08:45:00'},
// 		  {uid : 'E5s0G9BwLaXSmcBph2auq9AxlbU2',
// 		  time: '09:45:00'},
// 		  {uid : 's31lDmLCJDWTE0NgnNKWBozujd82',
// 		  time: '07:45:00'},
// 		  ],
// 	M :[{uid : '2nkQe7yzC4XdyVfmteo0HBGqYC83',
// 		  time: '08:35:00'},
// 		  {uid : 'Js5CyWMhrfO2nsXtW22peZazo2w1',
// 		  time: '08:16:00'},
// 		  {uid : 'NKKkGVFungf24CMnv8zGKjFChS83',
// 		  time: '09:07:00'},
// 		  ],
// 	C :[{uid : '8Ez32ldV0oY52HqXWsdyQ4Ykfkm1',
// 		  time: '08:15:00'},
// 		  {uid : 'gjDUXynRARPb3KMyUKkphrjkKke2',
// 		  time: '09:16:00'},
// 		  {uid : 'lAf5YWZbyhb1fJDBZ7ZsUgSHeni1',
// 		  time: '09:05:00'},
// 		  ]
// 	}