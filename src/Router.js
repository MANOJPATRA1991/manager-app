import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Stack, Scene, Router, Actions } from 'react-native-router-flux';
import LoginFrom from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';
import UserDetails from './components/UserDetails';
import { logout } from './actions';

/**
 * Functional Router Component
 */
class RouterComponent extends Component {
    
    render() {
        const { titleStyle } = styles;
        return (
            <Router>
                <Scene key="root" hideNavBar>
                    
                    <Scene key="auth">
                        <Scene key="login" 
                        component={LoginFrom} 
                        title="Please Login" 
                        titleStyle={titleStyle}/>    
                    </Scene>

                    <Scene key="details">
                        <Scene initial key="userDetails" 
                            component={UserDetails} 
                            title="Your Details"
                            titleStyle={titleStyle}/>
                    </Scene>
                    
                    <Scene key="main">
                        
                        <Scene initial key="employeeList" 
                            component={EmployeeList} 
                            title="Employees"
                            titleStyle={titleStyle}
                            leftTitle="Log out"
                            rightTitle="Add"
                            onLeft={() => this.props.logout() }
                            onRight={() => Actions.employeeCreate()}  />
                        
                        <Scene key="employeeCreate"
                            component={EmployeeCreate}
                            title="Create Employee" 
                            titleStyle={titleStyle}
                            rightTitle="Empty"/>
    
                        <Scene key="employeeEdit"
                            component={EmployeeEdit}
                            title="Edit Employee" 
                            titleStyle={titleStyle}
                            rightTitle="Empty"/>
    
                    </Scene>
    
                </Scene>

            </Router>
        );
    }
};

const styles = {
    titleStyle: {
        textAlign: 'right',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center'
    }
};

// Connect LoginForm to Redux store
export default connect(null, { 
    logout
})(RouterComponent);