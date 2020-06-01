import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import routeReducer from './routeReducer'
import stopsReducer from './stopsReducer'
import notificationReducer from './notificationReducer'
import appReducer from './appReducer'

const rootReducer = combineReducers({
    route: routeReducer,
    stops: stopsReducer,
    notification: notificationReducer,
    app: appReducer,
    firestore: firestoreReducer
})

export default rootReducer