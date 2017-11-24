import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

/**
 * ListItem component
 */
class ListItem extends Component {

    /**
     * Called on pressing each list item
     */
    onRowPress() {
        Actions.employeeCreate({ employee: this.props.employee });
    }

    render() {
        // Get the name of the employee
        const { name } = this.props.employee;

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection>
                        <Text style={styles.titleStyle}>
                            {name}
                        </Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

/**
 * Default styling for the ListItem Component
 */
const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
}

export default ListItem;