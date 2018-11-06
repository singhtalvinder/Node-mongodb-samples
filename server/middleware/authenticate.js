var {User} = require('./../models/user');

// Middleware function 
var authenticate = (req, res, next) => {
    // get token
    var token = req.header('x-auth');
    
    // find a user by token.
    User.findByToken(token).then((user) => {
        if(!user) {
            // not found !! 
            return Promise.reject(); // will execute code under catch
        }

        // modify req to be used in request where needed.
        req.user = user;
        req.token = token;
        next(); 
    }).catch((e) => {
        // auth failed.
        res.status(401).send();
    });
};

// export the middleware method for others to consume.
module.exports ={authenticate};