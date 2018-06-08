var fs = require('fs');
const {getFile} = require('./admin-json');

var getAllFac = async function(depart,socket){

	var filename = getFile(depart);
	console.log(filename)
	console.log(filename);

	fs.readFile(filename ,'utf8' ,(err, data) => {
  	
  	if(err){
			socket.emit('serverStatus',{status : 'false'});
		}
		else
		{	
			var json = JSON.parse(data);
      		socket.emit('gotFac',json.users);
  		}
	});
}


module.exports = {getAllFac}