class CheckTeam {
    constructor(team) {
        this.availableMembers = team.maxmembers - team.users.length;
        this.productOwner = 0;
        this.scrumMaster = 0;
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

    setProductOwner(usersTeam) {
        
        return new Promise(resolve => {
            usersTeam.forEach(user => {

                if(user.role === 'productOwner') resolve(this.productOwner = 1);
            });
        });
    }

    setScrumMaster(usersTeam) {
        
        return new Promise(resolve => {
            usersTeam.forEach(user => {
                
                if(user.role === 'scrumMaster') resolve(this.scrumMaster = 1);
            });
        });
    }

    getMoreDevs() {
        return new Promise(resolve => {

            if(this.getAvailableMembers() > 0 && this.getAvailableMembers() <= 2) {
                if(this.getProductOwner() && this.getScrumMaster()) {
                    
                    resolve(true);
                }else {
    
                    resolve(false);
                }
            
            }else {
                
                resolve(true);
            }
        });
    }

};

module.exports = CheckTeam;