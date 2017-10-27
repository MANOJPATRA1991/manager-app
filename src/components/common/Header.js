// Import libraries for making a component
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Make the Header component
class Header extends Component {
    render() {
        // destructuring to remove duplicate references to styles object
        const { textStyle, viewStyle } = styles;
        return (
            // View tag is used to make positioning easier
            <View style={viewStyle}>
                <Text style={textStyle}>{this.props.headerText}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        elevation: 3,
        position: 'relative'
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 20
    }
});

// Make the component available to other parts of the app
export { Header };

