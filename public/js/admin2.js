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
})