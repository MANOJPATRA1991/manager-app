import _ from 'lodash';
import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';

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

    render() {
        console.log(this.props);
        // Create a list of employees
        return (
            <FlatList
              data={this.props.employees}
              renderItem={this.renderItem}
            />
        );
    };
}

/**
 * Maps state to this components props object
 * @param {Object} state : State of the store
 */
const mapStateToProps = (state) => {
    // An array of employees with name, shift, phone and uid keys per employee instance
    const employees = _.map(state.employees, (val, uid) => {
        return { ...val, uid };
    });

    return { employees };
};

// Connect EmployeeList Component to the Redux store
export default connect(mapStateToProps, { 
    employeesFetch 
})(EmployeeList);