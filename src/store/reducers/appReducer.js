const initState = {
    isItDark: false,
    strPoint: "Hermoupolis"
}

const appReducer = ( state = initState, action ) => {
    switch(action.type){
        case "SAVE_THEME":
            return{
                ...state,
                isItDark: action.theme
            };
        case "SAVE_STRPOINT":
            return{
                ...state,
                strPoint: action.str
            };
        default:
            return state;
    }
}

export default appReducer