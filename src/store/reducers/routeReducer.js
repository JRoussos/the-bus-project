const initState = {
    routes: {
        route: [],
        startingPoint: "",
        time: []
    },
    routePassedToDetails: {},
    startingPointPassedToDetails: {},
    villageDetailsId: {}
}

const routeReducer = ( state = initState, action ) => {
    switch(action.type){
        case "SAVE_ROUTE":
            return{
                ...state,
                routePassedToDetails: action.route,
                startingPointPassedToDetails: action.startingPoint
            };
        case "SAVE_ROUTE_DATA":
            return{
                ...state,
                routes: action.routesData
            };
        case "ROUTE_DETAILS":
            return{
                ...state,
                villageDetailsId: action.village
            };
        default:
            return state;
    }
}

export default routeReducer