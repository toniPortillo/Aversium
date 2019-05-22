'use strict';
module.exports = session => {
    session.destroy()
    .then(() => {
        return "Se cerro sesión con exito";
    })
    .catch((err) => {
        throw new Error(err.message)
    });
};