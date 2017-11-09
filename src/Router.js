import React from 'react';
import { Stack, Scene, Router } from 'react-native-router-flux';
import LoginFrom from './components/LoginForm';
import EmployeeList from './components/EmployeeList';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene key="login" component={LoginFrom} title="Please Login" />    
                </Scene>
                <Scene key="main">
                    <Scene key="employeeList" component={EmployeeList} title="Employees" />
                </Scene>
            </Scene>
        </Router>
    )
};

export default RouterComponent;