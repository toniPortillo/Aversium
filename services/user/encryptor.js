'use strict';
module.exports = bcrypt => {
    return async password => {
        try {
            const hash = await bcrypt.hash(password, 12);
            return hash;
        }catch(err) {
            throw err;
        }    
    };
};