// use only the Sha256.
const {SHA256} = require('crypto-js');

//II: Easier way: JWT library.
const jwt = require('jsonwebtoken');

//bcryptjs for salting n hashing passwords.
const bcrypt = require('bcryptjs');

// testing salt and Hash
var passwd = 'password123!';

bcrypt.genSalt(10,(err, salt) => {
    bcrypt.hash(passwd, salt, (err, hash) => {
        //console.log(hash);
    });
});

var hashedPasswd = '$2a$10$YAiMXPGwju.IBnnh9TngyO1tDC/yX9U.TSa5FderpYf1rlm97ON.q';
bcrypt.compare(passwd, hashedPasswd, (err, res) => {
    console.log(res);
})

/*
var data = {
    id: 10
};

var token = jwt.sign(data, 'myjwtsecret123');
console.log(token);

var decoded = jwt.verify(token, 'myjwtsecret123');
console.log('Decoded token:', decoded);
*/

// I: using SHA256
/*
var message = 'Im client number 4';

var hash = SHA256(message).toString(); 
    
console.log(`Message: ${message}`);

console.log(`Hash: ${hash}`);


var data = {
    id: 4
};

var token = {
    //data: data
    data, // ES6
    hash: SHA256(JSON.stringify(data) + 'mysaltedsecret').toString()
}
// salt the hash means add something unique so that we can avoid 
// tricks for tokens that user can manipulate from the client side
// for ex:
// token.id = 6; // some other client/user id.
// token.hash = SHA256(JSON.stringify(token.data)).toString();
// above will not work since the salted value is on the server side 
// and the call will not succeed as the match will fail.



var resultHash = SHA256(JSON.stringify(token.data) + 'mysaltedsecret').toString();

if(resultHash === token.hash){
    console.log('Data was not changed');
} else {
    console.log('Data was changed !!!');
}

// So, in production code I'll be using JWT, the JSON webtoken to use it in an 
// easyto use manner.
*/

