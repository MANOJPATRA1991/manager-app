import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
// a middleware
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

import Router from './Router';

class App extends Component {
    componentWillMount() {
        // Initialize Firebase
        const config = {
            apiKey: "AIzaSyAP9wD7lmwV91C6SWpAsPn7BL8FiFjTobk",
            authDomain: "manager-751ee.firebaseapp.com",
            databaseURL: "https://manager-751ee.firebaseio.com",
            projectId: "manager-751ee",
            storageBucket: "gs://manager-751ee.appspot.com",
            messagingSenderId: "668533376963"
        };
        firebase.initializeApp(config);
    }
    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;