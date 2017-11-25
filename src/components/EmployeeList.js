import _ from 'lodash';
import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text } from 'react-native';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';
import { CardSection, Card } from './common';

/**
 * EmployeeList Component displays the list of employees for logged in user
 */
class EmployeeList extends Component {


    componentWillMount() {
        // Fetch the employees
        this.props.employeesFetch();
    }

    /**
     * Renders a list item containing an employee's details
     * @param {Object} param0 : An object with key item and value as employee details 
     * @returns ListItem Component
     */
    renderItem({ item }) {
        return <ListItem employee={item} />
    }

    /**
     * Renders employees in a list
     */
    renderEmployees(style) {
        if (this.props.employees.length === 0) {
            return (
                <CardSection>
                    <Text style={style}> No employee found.</Text>
                </CardSection>
            );
        } else {
            return (
                <FlatList style={style}
                data={this.props.employees}
                renderItem={this.renderItem}
                />
            );
        }
    }

    render() {
        const { textStyle, employee } = styles;
        // Create a list of employees
        return (
            <View>
                <CardSection>
                    <Text style={textStyle}>{`Welcome\n${this.props.user.displayName}`}</Text>
                </CardSection>
                
                {this.renderEmployees(employee)}
            </View>
        );
    };
}

const styles = {
    employee: {
        fontSize: 20
    },
    textStyle: {
        fontSize: 50,
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center'
    }
};

/**
 * Maps state to this components props object
 * @param {Object} state : State of the store
 */
const mapStateToProps = (state) => {
    // An array of employees with name, shift, phone and uid keys per employee instance
    const employees = _.map(state.employees, (val, uid) => {
        return { ...val, uid };
    });
    // Get logged in user
    const { user } = state.auth;
    return { employees, user };
};

// Connect EmployeeList Component to the Redux store
export default connect(mapStateToProps, { 
    employeesFetch 
})(EmployeeList);