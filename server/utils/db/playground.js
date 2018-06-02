var month = 'september';
var thresh1 = "11:45:00";
var thresh2 = "14:45:00";
var thresh3= "17:00:00";

var toDate = function(string){
var ref = new Date()
var result = string.split(":");
var date = new Date(`${ref.getFullYear()}`,`${ref.getMonth()}`,`${ref.getDate()}`,result[0],result[1],result[2]);
return date;
}

var data1 = toDate(thresh1);
var data2 = toDate(thresh2)

console.log(data1.getDate())

if(data1.getTime()>data2.getTime()){
	console.log(data1.toLocaleTimeString());
}else{
	console.log(data2.toLocaleTimeString());
}

module.exports = {toDate};