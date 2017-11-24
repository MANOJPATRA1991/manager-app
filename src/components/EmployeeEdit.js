import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { Card, CardSection, Button, Confirm } from './common';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
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

    /**
     * Toggle modal display
     */
    toggleModal() {
        this.setState(previousState => {
            return { showModal: !previousState.showModal };
        });
    }

    /**
     * Called when confirm delete an employee
     */
    onAccept() {
        const { uid } = this.props.employee;
        this.props.employeeDelete({ uid });
        setTimeout(() => {
            this.toggleModal();
        }, 2000)
    }

    /**
     * Called to cancel a delete operation
     */
    onDecline() {
        this.toggleModal();
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
                
                    <Button onPress={this.toggleModal.bind(this)}>
                        Fire Employee
                    </Button>

                </CardSection>

                <Confirm 
                visible={this.state.showModal}
                onAccept={this.onAccept.bind(this)}
                onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to fire {this.props.employee.name}?
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

// Connect EmployeeEdit component to Redux store
export default connect(mapStateToProps, { 
    employeeUpdate, employeeSave, employeeDelete
})(EmployeeEdit);