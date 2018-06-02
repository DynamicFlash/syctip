var getMon = function (month){

	switch(month){
		case '1':
		return "january";
		break;

		case '2':
		return "february";
		break;

		case '3':
		return "march";
		break;

		case '4':
		return "april";
		break;

		case '5':
		return "may";
		break;

		case '6':
		return "june";
		break;

		case '7':
		return "july";
		break;

		case '8':
		return "august";
		break;

		case '9':
		return "september";
		break;

		case '10':
		return "october";
		break;

		case '11':
		return "november";
		break;

		case '12':
		return "december";
		break;		
	}
}

var toDate = function(string){
var ref = new Date()
var result = string.split(":");
var date = new Date(`${ref.getFullYear()}`,`${ref.getMonth()}`,`${ref.getDate()}`,result[0],result[1],result[2]);
return date;
}


module.exports = {toDate,getMon};