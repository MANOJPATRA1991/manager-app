import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

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
        return (
            <Provider store={createStore(reducers)}>
                <LoginForm />
            </Provider>
        );
    }
}

export default App;