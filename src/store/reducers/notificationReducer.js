const initState = {
    notifications: []
}

const notificationReducer = ( state = initState, action ) => {
    switch(action.type){
        case "SAVE_NOTIFICATIONS":
            return{
                ...state,
                notifications: action.notis
            };
        default:
            return state;
    }
}

export default notificationReducer