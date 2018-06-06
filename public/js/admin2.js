const socket = io();
var uid;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var user = firebase.auth().currentUser;

    if(user != null){
    	uid = user.uid;
      $("#checkp").text('object');
    }

  } else {
    // No user is signed in.
console.log("no user signed in")
  }
});


var getDep = function(val){

  socket.emit('getFac',{depart : `${val}`,
                        uid : `${uid}`
                      })

}

socket.on('gotFac',function(data){
  console.log(data);

  if(data!=null){
    document.getElementById("all_div").style.display = "none";
    document.getElementById("depart_div").style.display = "block";

    for(var i = 0 ;i<data.length;i++){
    var $input = $(`<input type="button" value="${data[i].name}" />`);
        $input.appendTo($("#depart_div"));
    }

  }
})


socket.on('serverStatus',function(data){
  if(data.status=='true'){
    console.log('successful');
  }
  else
    console.log('something went wrong');
});