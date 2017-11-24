import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './common';
import { employeeCreate, resetForm } from '../actions';
import EmployeeForm from './EmployeeForm';

/**
 * EmployeeCreate component creates a new employee
 */
class EmployeeCreate extends Component {

    componentWillMount() {
        // Reset this form on component mount
        this.props.resetForm();
    }

    /**
     * Creates a new employee and adds to the logged in user's employee list
     */
    onButtonPress() {
        const { name, phone, shift } = this.props;
        this.props.employeeCreate({ name, phone, shift:  shift || 'Monday' });
    }

    render() {
        return (
            <Card>
                <EmployeeForm {...this.props} />

                <CardSection>

                    <Button
                    onPress={this.onButtonPress.bind(this)}>
                        Create
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
    employeeCreate, resetForm
})(EmployeeCreate);