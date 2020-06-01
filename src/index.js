/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

// import AdminLayout from "layouts/Admin/Admin.jsx";
import './assets/css/scrollbar.css'


import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import firebaseConfig from './config/firebaseConfig'
import firebase from "firebase/app";
import { lazy, Suspense } from "react";

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';

import * as serviceWorker from './serviceWorker';

const AdminLayout = lazy( () => import("./layouts/Admin/Admin.jsx") )
// const NotFound = lazy( () => import("./views/components/NotFound.jsx") )

if(navigator.cookieEnabled){
    const theme = localStorage.lightmode;
    // console.log("theme: ", theme)
    if (theme === undefined) {
        localStorage.lightmode = "white-content";
    }else if(theme === "white-content"){
        document.body.classList.add(localStorage.lightmode);
    }else{
        document.body.classList.remove("white-content");
    }
}

const hist = createBrowserHistory();
const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(firebaseConfig),
    )
);

const rrfProps = {
    firebase, 
    config: firebaseConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
}

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <Router history={hist}>
                <Suspense fallback={
                    <div style={{height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                    }>
                    <Switch>
                        <Route path="/" render={props => <AdminLayout {...props}/>}></Route>
                        {/* <Route path="*" exact={true} component={<NotFound/>}></Route> */}
                    </Switch>
                </Suspense>
                </Router>
            </ReactReduxFirebaseProvider>
        </Provider>
    </I18nextProvider>,
    document.getElementById("root")
);

serviceWorker.register();
// ReactDOM.render(
//   <Router history={hist}>
//     <Switch>
//       <Route path="/admin" render={props => <AdminLayout {...props} />} />
//       <Redirect from="/" to="/admin/dashboard" />
//     </Switch>
//   </Router>,
//   document.getElementById("root")
// );