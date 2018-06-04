  const socket = io();

  socket.on('connect', function(){
    console.log('connected to server');
  });


  socket.on('users',(user)=>{
  	console.log(user.uid);
  })

socket.on('mData',function(data){
	console.log(data);
});

socket.on('piStat',function(data){
	console.log(data)
})

socket.on('piOnline',function(data){
	if(data){
		console.log("pi connected");
	}
});

socket.on('userStatus', function(user){
	console.log(`${user} is added`);
});

// socket.emit('getM',{month : 'june'});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      // document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
    //   $("#user_para").text(`Welcome User :   ${email_id}`);
    // socket.emit('getUid',{uid : user.uid}, function(res){
    //   window.alert(res);
    // })

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = jQuery('[name=email]').val();
  var userPass = jQuery('[name=password]').val();

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function logout(){
  firebase.auth().signOut();
}

function month(mon){
	socket.emit('getM',{month : `${mon}`});
}

  socket.on('disconnect', function(){
    console.log('disconnected from server');
  });

