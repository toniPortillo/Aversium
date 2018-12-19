class CheckTeam {
    constructor(team) {
        this.availableMembers = team.maxmembers - team.users.length;
        this.productOwner = false;
        this.scrumMaster = false;
        this.devsMembers = this.availableMembers - 2;
    }

    getAvailableMembers() {
        return this.availableMembers;
    }

    getProductOwner() {
        return this.productOwner;
    }

    getScrumMaster() {
        return this.scrumMaster;       
    }

    getDevsMembers() {
        return this.devsMembers;
    }

    setProductOwner(usersTeam) {
        
        return new Promise(resolve => {
            usersTeam.forEach(user => {

                if(user.role === 'productOwner') {
                    
                    resolve(this.productOwner = true);
                }

                resolve(this.productOwner = false);
            });
        });
    }

    setScrumMaster(usersTeam) {
        
        return new Promise(resolve => {
            usersTeam.forEach(user => {
                
                if(user.role === 'scrumMaster') {

                    resolve(this.scrumMaster = true);
                } 

                resolve(this.scrumMaster = false);
            });
        });
    }

    newProductOwner(resolve) {
        
            if(this.getAvailableMembers > 0 && this.getProductOwner() != true) {
                
                resolve (true);
            };
            
            resolve(false);
    }

    newScrumMaster(resolve) {
    
            if(this.getAvailableMembers > 0 && this.getScrumMaster() != true) {
                
                resolve (true);
            }

            resolve(false);
    }

    newDeveloper(resolve) {

            if(this.getDevsMembers > 0) {
            
                resolve(true);
            }

            resolve(false);
    }

    checkFactory(user) {
        console.log(user.role);
        return new Promise(resolve => {
            if(user.role === 'productOwner') {
            
                this.newProductOwner(resolve);
            }else if(user.role === 'scrumMaster') {
                
                this.newScrumMaster(resolve);
            }else if(user.role === 'developer') {

                this.newDeveloper(resolve);
            }else {
                
                resolve(false);
            }
        });

    }

};

module.exports = CheckTeam;