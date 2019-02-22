'use strict';

function asyncCheckItem(array, item) {
    
    let searchItem = new Promise((resolve, reject) => {
        setTimeout(() => {
            
            if(array.length == 0) reject();
            array.forEach(element => {
                
                if(element.username === item) {
                
                    resolve();
                }
            });
            reject();
        }, 0);
    });
    
    return searchItem;
}

module.exports = asyncCheckItem;