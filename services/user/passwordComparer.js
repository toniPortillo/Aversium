'use strict';
module.exports = bcrypt => {
    return async (password, hash) => {
        try {
            const match = await bcrypt.compare(password, hash);
            return match;
        }catch(err) {
            throw err;
        }
    };
};