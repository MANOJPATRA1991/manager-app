import React, { Component } from 'react';
import { Picker } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button } from './common';
import { employeeUpdate } from '../actions';


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

                <CardSection>
                    <Picker
                        style={styles.pickerStyle}
                        selectedValue={this.props.shift}
                        onValueChange={(value) => this.props.employeeUpdate({ prop: 'shift', value })}
                    >
                        {this.renderPickerDays()}
                    </Picker>
                </CardSection>

                <CardSection>
                    <Button>
                        Create
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    pickerStyle: {
        flex: 1
    }
};

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;

    return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate })(EmployeeCreate);