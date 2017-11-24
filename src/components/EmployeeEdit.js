import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { Card, CardSection, Button, Confirm } from './common';
import { employeeUpdate, employeeSave } from '../actions';
import EmployeeForm from './EmployeeForm';

/**
 * EmployeeEdit component displays a form to edit the employee data
 */
class EmployeeEdit extends Component {

    state = {
        showModal: false
    };

    componentWillMount() {
        // Add each property of passed in employee to the state object
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({ prop, value });
        });
    }

    /**
     * Update employee and add updated employee details
     * to the logged in user's employee list
     */
    onButtonPress() {
        const { name, phone, shift } = this.props;
        this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
    }

    /**
     * Send text message to the employee informing them about their schedule
     */
    onTextPress() {
        const { phone, shift } = this.props;
        Communications.text(phone, `Your upcoming shift is on ${shift}`);
    }

    render() {
        return (
            <Card>
    
                <EmployeeForm {...this.props}/>
    
                <CardSection>
                    
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>

                </CardSection>

                <CardSection>
                    
                    <Button onPress={this.onTextPress.bind(this)}>
                        Text Schedule
                    </Button>

                </CardSection>

                <CardSection>
                
                    <Button onPress={this.setState({ showModal: !this.state.showModal })}>
                        Fire Employee
                    </Button>

                </CardSection>

                <Confirm 
                visible={this.state.showModal}
                >
                    Are you sure you want to delete this employee?
                </Confirm>
    
            </Card>
        );
    }
}

/**
 * Maps state to this components props object
 * @param {Object} state : State of the store
 */
const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;
    return { name, phone, shift };
};

// Connect EmployeeCreate component to Redux store
export default connect(mapStateToProps, { 
    employeeUpdate, employeeSave
})(EmployeeEdit);