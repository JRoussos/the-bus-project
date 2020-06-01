export const createRoute = (route) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //async call to firebase
        // const firestore = getFirestore();
        
    }
}

export const saveRoute = (route, startingPoint) => {
    return {
        type: "SAVE_ROUTE",
        startingPoint,
        route
    }
}

export const saveRouteData = (route) => {
    return {
        type: "SAVE_ROUTE_DATA",
        route
    }
}

export const passRouteDetails = (village) => {
    return {
        type: "ROUTE_DETAILS",
        village
    }
}