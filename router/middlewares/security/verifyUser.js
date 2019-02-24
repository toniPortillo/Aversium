'use strict';
let verifyUser = (req, res, next) => {

    if(req.session.user == undefined) {

        res.redirect('/users/login');
    }else {
        
        next();
    }
}


module.exports = verifyUser;