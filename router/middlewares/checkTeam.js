class CheckTeam {
    constructor(team) {
        this.availableMembers = team.maxmembers - team.users.length;
        this.productOwner = 0;
        this.scrumMaster = 0;
        this.availableDevelopers = this.availableMembers - 2;
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

    getAvailableMembers() {
        return this.availableDevelopers;
    }

    setProductOwner(usersTeam) {
        return new Promise(resolve => {
            if(usersTeam.length === 0) resolve(this.productOwner = this.productOwner);
            
            usersTeam.forEach(user => {
                if(user.role === 'productOwner') {

                    this.availableDevelopers = this.availableDevelopers + 1;
                    resolve(this.productOwner = 1);
                }else {

                    resolve(this.productOwner = this.productOwner);
                }

            });
        });
    }

    setScrumMaster(usersTeam) {
        
        return new Promise(resolve => {
            if(usersTeam.length === 0) resolve(this.scrumMaster = this.scrumMaster);
            
            usersTeam.forEach(user => { 
                if(user.role === 'scrumMaster') {
                
                    this.availableDevelopers = this.availableDevelopers + 1;
                    resolve(this.scrumMaster = 1);
                }else {

                    resolve(this.scrumMaster = this.scrumMaster);
                }
                
            });
        });
    }

    newProductOwner(resolve) {
        if(this.availableMembers > 0 && this.productOwner === 0) {
            
            resolve (true);
        }else {
            
            resolve(false);
        }
    }
    
    newScrumMaster(resolve) {
            if(this.availableMembers > 0 && this.scrumMaster === 0) {
 
                resolve (true);
            }else {
                
                resolve(false);
            }

    }

    newDeveloper(resolve) {

            if(this.availableDevelopers > 0) {
            
                resolve(true);
            }else {

                resolve(false);
            }

    }

    checkFactory(user) {
        
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