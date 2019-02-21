'use strict';

function asyncCheckItem(array, item) {

    let searchItem = new Promise((resolve, reject) => {
        setTimeout(() => {
            let check = 0;
            array.forEach(element => {
                if(element === item) {
                
                    check = 1;
                    resolve(check);
                }else {

                    reject(check);
                }
            });
        }, 0);
    });
    
    return searchItem;
}

module.export = asyncCheckItem;