import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './common';
import { employeeUpdate, employeeSave } from '../actions';
import EmployeeForm from './EmployeeForm';

/**
 * EmployeeEdit component displays a form to edit the employee data
 */
class EmployeeEdit extends Component {
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

    render() {
        return (
            <Card>
    
                <EmployeeForm {...this.props}/>
    
                <CardSection>
                    
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>
    
                </CardSection>
    
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