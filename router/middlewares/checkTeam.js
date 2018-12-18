class CheckTeam {
    constructor(team) {
        this.availableMembers = team.maxmembers - team.users.length;
        this.productOwner = 0;
        this.scrumMaster = 0;
        this.moreDevs = 0;
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
        usersTeam.forEach(user => {
            new Promise(resolve => {
                if(user.role === "productoOwner") resolve(this.productOwner = 1);                
            })
        });
    }

    setScrumMaster(usersTeam) {
        usersTeam.forEach(user => {
            new Promise(resolve => {
                if(user.role === "scrumMaster") resolve(this.scrumMaster = 1);
            })
        });
    }

    setMoreDevs(usersTeam) {
        if(this.availableMembers = 2) {
            if(this.getProductOwner() && this.getScrumMaster()) {
                return true;
            
            }else {
                return false;
            }
        
        }else {
            return true;
        }
    }

};