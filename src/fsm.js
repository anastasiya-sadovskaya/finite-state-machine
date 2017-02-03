class FSM {
    constructor(config) {
        if (!config){
            throw new error();
        }
        this.initial = config.initial;
        this.state = this.initial;
        this.states = config.states;
        this.history = [];
        this.undoHistory = [];
    }

    getState() {
        return this.state;
    }

    
    changeState(state) {
        if (this.states[state]){
            this.state = state;
            this.history.push(state);
        }else {
            throw new error(); 
        }
    }

    trigger(event) {
        if(this.states[this.state].transitions[event]){
            this.changeState(this.states[this.state].transitions[event]);
        } else {
            throw new error();
        }
    }

    
    reset() {
       return this.state = this.initial;

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

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.history.length > 0){
            // this.undoHistory.push(this.history.pop());
            // this.state = this.history[this.history.length - 1];
            return true;

        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.undoHistory.length > 0){
            // this.history.push(this.undoHistory.pop());
            // this.state = this.undoHistory.length - 1;

        } else {
            return false;
        }
    }

    clearHistory() {
        this.history = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
