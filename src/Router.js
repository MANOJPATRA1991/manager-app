import React from 'react';
import { Stack, Scene, Router, Actions } from 'react-native-router-flux';
import LoginFrom from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';

/**
 * Functional Router Component
 */
const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar>
                
                <Scene key="auth">
                    <Scene key="login" component={LoginFrom} title="Please Login" />    
                </Scene>
                
                <Scene key="main">
                    
                    <Scene initial key="employeeList" 
                        component={EmployeeList} 
                        title="Employees"
                        rightTitle="Add"
                        onRight={() => Actions.employeeCreate()}  />
                    
                    <Scene key="employeeCreate"
                        component={EmployeeCreate}
                        title="Create Employee" />

                </Scene>

            </Scene>
        </Router>
    )
};

export default RouterComponent;