  const socket = io();
  document.getElementById("login_div").style.display = "block";

  var uid,fac;


socket.on('serverStatus',function(data){
	if(data.status=='true'){
		console.log('successful');
	}
	else
		console.log('something went wrong');
});


var deleteUser = function(){

		var name = jQuery("#dName").val();
		var data ={auid : `${uid}`,name : `${name}`};
		socket.emit('adminDelete',data);
	}

var updateUser = function(){
	var name = jQuery("#uName").val();
	var month = jQuery("#uMonth").val();
	var date = jQuery("#uDate").val();
	var uf = jQuery("#uTime").val();
	var time = jQuery("#nTime").val();

	var data = {uid : `${uid}`,
				name: `${name}`,
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
    document.getElementById("login_div").style.display = "none";
	}

	else{
		  console.log(`${data.status}`)
		  logout();
		 event.preventDefault();
		 $("#ad_min").text('Only for Admin');
	}
})

var getDep = function(){

  socket.emit('getFac',{uid : `${uid}`})

}

socket.on('gotFac',function(data){
  console.log(data);

  if(data!=null){
    //document.getElementById("all_div").style.display = "none";
    document.getElementById("all_fac_div").style.display = "block";
    datau = data;
    for(var i = 1 ;i<data.length;i++){
    var $input = $(`<input type="button" id ="${datau[i].name}" onClick="getData(datau[${i}].name)" value="${data[i].name}" />`);
        //var data[i].name = `${data[i].name}`
        $input.appendTo($("#all_fac_div"));
    }

  }
})


var getData = function(data){
  document.getElementById("all_fac_div").style.display = "none";
  document.getElementById("month_div").style.display = "block";
  fac = `${data}`;
}

function month(mon){
  socket.emit('adminGetM',{uid :`${uid}`,
              name : `${fac}`,
          month : `${mon}`});

  console.log(`uid :${uid} , name : ${fac} , month ; ${mon}`);
}

socket.on('mData',function(data){
  console.log(data);
});

function logout(){
  document.getElementById("all_fac_div").style.display = "none";
  document.getElementById("month_div").style.display = "none";
  firebase.auth().signOut();
  uid = null;
}