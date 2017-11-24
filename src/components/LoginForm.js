import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card , CardSection, Input, Button, Spinner } from './common';

/**
 * Login form component
 */
class LoginForm extends Component {
    
    /**
     * Called on change in email input field
     * @param {String} text : input field value
     */
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    /**
     * Called on change in password input field
     * @param {String} text : input field value
     */
    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    /**
     * Called on login button press
     */
    onButtonPress() {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }

    /**
     * Render button in the form
     */
    renderButton() {
        // Show spinner when loading is true
        if(this.props.loading) {
            return <Spinner size="large" />
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Login
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input 
                        label="Email"
                        placeholder="email@gmail.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

/**
 * Default styling for the LoginForm component
 */
const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

/**
 * Maps state to this components props object
 * @param {Object} state : State of the store
 */
const mapStateToProps = ({ auth }) => {
    return  { email, password, error, loading } = auth ;
};

// Connect LoginForm to Redux store
export default connect(mapStateToProps, { 
    emailChanged, 
    passwordChanged, 
    loginUser 
})(LoginForm);