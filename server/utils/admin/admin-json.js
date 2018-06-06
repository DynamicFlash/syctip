var appendjson = require('appendjson');
const {readJSON, writeJson} = require('json-reader-writer')
var fs = require('fs');



var facWrite  = async function(filename , putdata){

	var obj = {
				users: []
			};

	fs.readFile(filename ,'utf8' ,(err, data) => {
  	
  	if(err){
			throw err;
		}
		else
		{	
			var cdata = JSON.parse(data); 
			cdata.users.push(putdata);
			console.log(cdata.users)
			var json = JSON.stringify(cdata);
			fs.writeFile(filename,json,(err)=>{
		
			if(err){
			Promise.reject(err)
			}
		else
		{
			console.log('done');
		}
	}) 
			//console.log(json);
  		}


	//new data

	})

}

var facRead = async function(filename,socket){

	fs.readFile(filename ,'utf8' ,(err, data) => {
  	
  	if(err){
			throw err;
		}
		else
		{
			var json = JSON.parse(data);
			socket.emit('allfac',json);
			console.log(json);
  		}
	});
}


var facDel = async function(filename,uid,depart,socket){

	fs.readFile(filename ,'utf8' ,(err, data) => {
  	
  	if(err){
			socket.emit('serverStatus',{status : 'false'});
		}
		else
		{	
			var json = JSON.parse(data);
			console.log(json.users)
    			for(var i=0;i<json.users.length;i++){
      				if(json.users[i].uid==uid){
        			json.users.splice(i, 1);
        			break;
      				}
    			}

    			var sjson = JSON.stringify(json)
    			console.log(sjson);
				fs.writeFile(filename,sjson,(err)=>{
		
					if(err){
					Promise.reject(err)
					}
					else
					{
					console.log('done');
						}
				}) 

      		socket.emit('serverStatus',{status : 'true'});
  		}
	});
}



var getFile = (data)=>{
  switch(data){
    case 'E':
      return "ece.json";

    case 'M':
      return "mach.json";

    case 'C':
      return "comp.json";  
  }
}



module.exports = {facWrite, facRead,getFile,facDel,getFile}