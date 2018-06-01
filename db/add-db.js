const {db} = require('./../connect/connect-admin-firestore');


var add = (user)=>{


var docRef = db.collection('users').doc(`${user.displayName}`);

var setAda = docRef.set({
    id: `${user.uid}`,
}).then(()=>{
	console.log(`sucessfully added ${user.displayName}`)
},(err)=>{
	console.log(err)
});

}


module.exports = add;