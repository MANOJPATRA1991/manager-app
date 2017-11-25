import React, { Component } from 'react';
import { TextInput, Text } from 'react-native';
import { connect } from 'react-redux';
import { userUpdate, saveUser } from '../actions';
import { CardSection, Input, Card, Button } from './common';

/**
 * User details component contains all form input fields
 */
class UserDetails extends Component {

    /**
     * Save updated user to database
     */
    onButtonPress() {
        this.props.saveUser(this.props.name);
    }

    render() {
        const { errorTextStyle, card, input } = styles;
        return (
            <Card>
                <CardSection style={card}>
                    <TextInput
                        underlineColorAndroid={'transparent'} 
                        style={styles.input}
                        placeholder="Enter your name"
                        value={this.props.name}
                        onChangeText={value => 
                            this.props.userUpdate({ prop: 'name', value })}
                    />
                </CardSection>

                <CardSection>
                    
                    <Text style={errorTextStyle}>
                        {this.props.error}
                    </Text>

                </CardSection>

                <CardSection>
                
                    <Button
                    onPress={this.onButtonPress.bind(this)}>
                        Done
                    </Button>

                </CardSection>

            </Card>
        );
    }
}

/**
 * Default styling for the UserDetails component
 */
const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    card: {
        height: '100%',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    input: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 0,
        fontSize: 30,
        lineHeight: 23,
        flex: 1,
        textAlign: 'center',
        flexWrap: 'wrap'
    }
}

/**
 * Maps state to this components props object
 * @param {Object} state : State of the store
 */
const mapStateToProps = (state) => {
    const { name, error } = state.auth;
    return { name, error };
};

// Connect EmployeeForm component to Redux store
export default connect(mapStateToProps, { 
    userUpdate, saveUser
})(UserDetails);