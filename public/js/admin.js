  const socket = io();
   document.getElementById("login_div").style.display = "block";

var create = function(){
  var userEmail = jQuery('#email_field').val();
  var userPass = jQuery('#password_field').val();
  var userName = jQuery('#name_field').val();
  socket.emit('adminNew',{email : `${userEmail}`,
						password : `${userPass}`,
						name : `${userName}`})
}


socket.on('userStatus',function(data){
	if(data.status=='true'){
		console.log(`${data.name} is successfully created`);
	}
	else
		console.log('something went wrong');
});


socket.on('piReg',function(userRecord){
	//console.log(userRecord);
	console.log("uid : " ,userRecord.uid);
	console.log("name : " ,userRecord.name);
	socket.emit('piNewUser',{uid : `${userRecord.uid}`,
								name : `${userRecord.name}`});
});


socket.on('serverStatus',function(data){
	if(data.status=='true'){
		console.log('successful');
	}
	else
		console.log('something went wrong');
});