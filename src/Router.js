import React from 'react';
import { Stack, Scene, Router } from 'react-native-router-flux';
import LoginFrom from './components/LoginForm';

const RouterComponent = () => {
    return (
        <Router>
            <Stack key="root">
                <Scene key="login" component={LoginFrom} title="Please Login" />    
            </Stack>
        </Router>
    )
};

export default RouterComponent;