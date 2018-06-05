firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var user = firebase.auth().currentUser;

    if(user != null){
    	//uid = user.uid;
      $("#checkp").text('object');
    }

  } else {
    // No user is signed in.
console.log("no user signed in")
  }
});