const {getFile,facRead,facWrite} = require('./admin-json');

var facDel = async function(depart,uid){
	var obj = await facRead(getFile(`${depart}`));
    var k;
    for(var i=0;i<obj.length;i++){
      if(obj[i].uid==uid){
        k=i
      }
    }
    obj[k]=null;
    for(var i=0;i<obj.length;i++){
      k = await facWrite(getFile(`${depart}`),obj[i]);
      }
}



//facWrite('check.json',{name : "Aldrinh", uid : 'ygd87qwhvdq6yfsdffdqyvdyq'});
var obj = await facRead('check.json');

