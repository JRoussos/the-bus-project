const initState = { 
    stopsKtel: {}
}

const stopsReducer = (state = initState, action) => {
    switch(action.type){
        case "SAVE_STOPS":
            return {
                ...state
            };
        default:
            return state;
    }
}

export default stopsReducer