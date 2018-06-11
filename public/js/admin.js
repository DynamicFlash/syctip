  const socket = io();
  document.getElementById("login_div").style.display = "block";

  var uid;

var create = function(){
  var userEmail = jQuery('#email_field').val();
  var userPass = jQuery('#password_field').val();
  var userName = jQuery('#name_field').val();
  var userDepart = jQuery('#depart_field').val();
  //console.log(userDepart);
  socket.emit('adminNew',{email : `${userEmail}`,
						password : `${userPass}`,
						name : `${userName}`,
						uid : `${uid}`,
						depart : `${userDepart}`})
}


socket.on('userStatus',function(data){
	if(data.status=='true'){
		console.log(`${data.name} is successfully created`);
	}
	else
		console.log('something went wrong');
});


// socket.on('piReg',function(userRecord){
// 	//
// 	socket.emit('piNewUser',{uid : `${userRecord.uid}`,
// 								name : `${userRecord.name}`,
// 								depart :`${userRecord.depart}`});
// });

// socket.on('piRegDel',function(userRecord){
// 	console.log(userRecord)
// 	socket.emit('piDelete',userRecord);
// });


socket.on('serverStatus',function(data){
	if(data.status=='true'){
		console.log('successful');
	}
	else
		console.log('something went wrong');
});


var deleteUser = function(){

		var name = jQuery("#dName").val();
		var depart =jQuery("#dDepart").val();
		var data ={auid : `${uid}`,name : `${name}`, depart : `${depart}`};
		socket.emit('adminDelete',data);
	}

var updateUser = function(){
	var name = jQuery("#uName").val();
	var month = jQuery("#uMonth").val();
	var date = jQuery("#uDate").val();
	var uf = jQuery("#uTime").val();
	var time = jQuery("#nTime").val();
	var depart = jQuery('#uDepart').val();

	var data = {uid : `${uid}`,
				name: `${name}`,
				depart: `${depart}`,
				month: `${month}`,
				date : `${date}`,
				uf : `${uf}`,
				time: `${time}`}

	socket.emit('adminUpdate', data);

}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var user = firebase.auth().currentUser;
    socket.emit('adminCheck',user.uid);
    if(user != null){
    	uid = user.uid;
    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  
  var userEmail = jQuery("#email").val();
  var userPass = jQuery("#password").val();
  console.log(`email : ${userEmail} password : ${userPass}`);

  firebase.auth().signInWithEmailAndPassword(userEmail,userPass).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);
  });

}

socket.on('admin' ,function(data){
	
	if(data.status == 'true'){
	console.log(`${data.status}`)
	document.getElementById("user_div").style.display = "block";
	document.getElementById("newUser_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
	}

	else{
		  console.log(`${data.status}`)
		  logout();
		 event.preventDefault();
		 $("#ad_min").text('Only for Admin');
	}
})

function logout(){
  firebase.auth().signOut();
  uid = null;
}