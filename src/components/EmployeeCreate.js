import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button } from './common';
import { employeeUpdate, employeeCreate } from '../actions';

/**
 * EmployeeCreate component creates a new employee
 */
class EmployeeCreate extends Component {
    /**
     * Render days of week in picker component
     */
    renderPickerDays() {
        const daysOfTheWeek = [
            { id: 0, label: 'Sunday' },
            { id: 1, label: 'Monday' },
            { id: 2, label: 'Tuesday' },
            { id: 3, label: 'Wednesday' },
            { id: 4, label: 'Thursday' },
            { id: 5, label: 'Friday' },
            { id: 6, label: 'Saturday' }
        ];

        return daysOfTheWeek.map((day) => 
            <Picker.Item key={day.id} label={day.label} value={day.label} />
        );
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
                <CardSection>
                    <Input
                        label="Name"
                        placeholder="Jane"
                        value={this.props.name}
                        onChangeText={value => 
                            this.props.employeeUpdate({ prop: 'name', value })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Phone"
                        placeholder="555-555-5555"
                        value={this.props.phone}
                        onChangeText={value => 
                            this.props.employeeUpdate({ prop: 'phone', value })}
                    />
                </CardSection>

                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={styles.pickerLabelStyle}>Shift</Text>
                    <Picker
                        style={styles.pickerStyle}
                        selectedValue={this.props.shift}
                        onValueChange={(value) => this.props.employeeUpdate({ prop: 'shift', value })}
                    >
                        {this.renderPickerDays()}
                    </Picker>
                </CardSection>

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
 * Default styling for the EmployeeCreate component
 */
const styles = {
    pickerStyle: {
        margin: 10
    },
    pickerLabelStyle: {
        fontSize: 18,
        paddingLeft: 20
    }
};

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
    employeeUpdate,
    employeeCreate
})(EmployeeCreate);