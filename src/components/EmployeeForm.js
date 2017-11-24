import React, { Component } from 'react';
import { View, Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';
import { CardSection, Input } from './common';

/**
 * Employee form component contains all form input fields
 */
class EmployeeForm extends Component {
    
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

    render() {
        return (
            <View>
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
                        onValueChange={(value) => 
                            this.props.employeeUpdate({ prop: 'shift', value })}
                    >
                        {this.renderPickerDays()}
                    </Picker>
                </CardSection>
            </View>
        );
    }
}

/**
 * Default styling for the EmployeeForm component
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

// Connect EmployeeForm component to Redux store
export default connect(mapStateToProps, { 
    employeeUpdate
})(EmployeeForm);