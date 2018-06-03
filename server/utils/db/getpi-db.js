const {db} = require('./../connect/connect-admin-firestore');
const {admin} = require('./../connect/connect-admin');
const {toDate,getMon} = require('./functions');


var writeDb = async function(socket,data){
//console.log(data);
var thresh1 = toDate("11:45:00");
var thresh2 = toDate("14:45:00");
var thresh3= toDate("16:59:00");
var ref,stat=true;	
for(var i=1;i<data.length;i++){

			ref = toDate(data[0].time);
			if(ref.getTime()<thresh1.getTime()){
			var setDoc = await db.collection('users').doc(data[i].name).collection(getMon(data[0].month)).doc(`${data[0].date}`).set({mtime :`${data[i].time}`}).catch((err)=>{stat=false});
			console.log(" I am from the morning loop ",`${getMon(data[0].month)} : ${data[0].date}: time :${data[i].time}`);
			}
			else if(thresh1.getTime()<ref.getTime() && ref.getTime()<thresh2.getTime()){
			var setDoc = await db.collection('users').doc(data[i].name).collection(getMon(data[0].month)).doc(`${data[0].date}`).update({atime :`${data[i].time}`}).catch((err)=>{stat=false});
			//console.log(" I am from the afternoon loop",`${getMon(data[0].month)} : ${data[0].date}: time :${data[i].time}`);
			}
			else if(ref.getTime()>thresh3.getTime()){
			var setDoc = await db.collection('users').doc(data[i].name).collection(getMon(data[0].month)).doc(`${data[0].date}`).update({etime :`${data[i].time}`}).catch((err)=>{stat=false});
			//console.log(" I am from the evening loop",`${getMon(data[0].month)} : ${data[0].date}: time :${data[i].time}`);
			}
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