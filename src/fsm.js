class FSM {
    constructor(config) {
        if (!config){
            throw new error();
        }
        this.initial = config.initial;
        this.state = this.initial;
        this.prev = null;
        this.deletedState = null;
        this.states = config.states;
    }

    getState() {
        return this.state;
    }

    
    changeState(state) {
        this.prev = this.state;

        if (this.states[state]){
            this.state = state;
        }else {
            throw new error(); 
        }
    }

    trigger(event) {
        this.prev = this.state;

        if(this.states[this.state].transitions[event]){
            this.changeState(this.states[this.state].transitions[event]);
        } else {
            throw new error();
        }
    }

    
    reset() {
        this.prev = null;
        this.state = this.initial;
       return this.state;

    }

    getStates(event) {
        if (!event){
            return Object.keys(this.states);
        } else {
            var states = [];
            for(var key in this.states){
                if (this.states[key].transitions[event]){
                    states.push(key);
                }
            }

            return states;
        }
    }

    
    undo() {
        if(this.prev){
            this.deletedState = this.state;
            this.state = this.prev;
            this.prev = null;
            return true;

        } else {
            return false;
        }
    }

    
    redo() {
        if (this.deletedState){
            this.prev = this.state;
            this.state = this.deletedState;
            this.deletedState = null;
            return true;

        } else {
            return false;
        }
    }

    clearHistory() {
        this.prev = null;
    }
}

module.exports = FSM;
