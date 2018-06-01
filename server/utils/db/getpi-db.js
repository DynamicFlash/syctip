const {db} = require('./../connect/connect-admin-firestore');
const {admin} = require('./../connect/connect-admin');

var month = 'september';
var thresh1 = "11:45:00";
var thresh2 = "14:45:00";
var thresh3= "17:00:00";

//this is to set the time on each day
//var setDoc = db.collection('users').doc('aldrinFernandes').collection('june').doc('3').update(data)
//make sure to check for new date arrival

//var setDoc = db.collection('users').doc('aldrinFernandes').collection('may').doc('1');

var foxy = new Date()


var data = [

		{	date : `${foxy.getDate()}`,
		 	time : "this is a test"
		 },

		{
			name : "aldrinFernandes",
			mtime : "09:14:00"
		},

		{
			name : "subodhNaik",
			mtime : "09:14:00"
		},

		{
			name : "shubhamParab",
			mtime : "09:14:00"
		},

		{
			name : "budhajiGawas",
			mtime : "09:14:00"
		}
		]

	
for(var i=0;i<data.length;i++){

	if(data[i].date==1){

		if(i!=0){
			var setDoc = db.collection('users').doc(data[i].name).collection(getMon(data[0].date.getMonth())).doc('1').set({mtime :`${data[i].mtime}`});
		}
	}
	else{
		//console.log(`this is for the ${i} loop`);
		if(i!=0){
			if(data[0].time.toTimeString()<thresh.toTimeString()){
			var setDoc = db.collection('users').doc(data[i].name).collection(getMon(data[0].date.getMonth())).doc(`${data[i].date}`).set({mtime :`${data[i].mtime}`});
			}
			else if(thresh.toTimeString()<data[0].time.toTimeString()<thresh1.toTimeString()){
			var setDoc = db.collection('users').doc(data[i].name).collection(getMon(data[0].date.getMonth())).doc(`${data[i].date}`).update({atime :`${data[i].atime}`});
		}
			else if(data[0].time.toTimeString()>thresh13.toTimeString()){
			var setDoc = db.collection('users').doc(data[i].name).collection(getMon(data[0].date.getMonth())).doc(`${data[i].date}`).update({etime :`${data[i].etime}`});
		}
		}
	}
}

var getMon = function (month){

	switch(month){
		case 1:
		return january;
		break;

		case 2:
		return february;
		break;

		case 3:
		return march;
		break;

		case 4:
		return april;
		break;

		case 5:
		return may;
		break;

		case 6:
		return june;
		break;

		case 7:
		return july;
		break;

		case 8:
		return august;
		break;

		case 9:
		return september;
		break;

		case 10:
		return october;
		break;

		case 11:
		return november;
		break;

		case 12:
		return december;
		break;		
	}
}