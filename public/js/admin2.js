const socket = io();
var uid,datau,fac;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var user = firebase.auth().currentUser;

    if(user != null){
    	uid = user.uid;
      $("#checkp").text('');
    }

  } else {
  document.getElementById("all_div").style.display = "none";
  document.getElementById("depart_div").style.display = "none";
  document.getElementById("fac_div").style.display = "none";
  $("#checkp").text('Admin Loged out');
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
    datau = data;
    for(var i = 1 ;i<data.length;i++){
    var $input = $(`<input type="button" id ="${datau[i].name}" onClick="getData(datau[${i}].name)" value="${data[i].name}" />`);
        //var data[i].name = `${data[i].name}`
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

var getData = function(data){
  //document.getElementById("all_div").style.display = "none";
  document.getElementById("depart_div").style.display = "none";
  document.getElementById("fac_div").style.display = "block";
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
  firebase.auth().signOut();
  uid = null;
  dataU =null;
  fac =null;
}