import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

class Card extends Component {
    render() {
        const { containerStyle } = styles;
        return (
            <View style={containerStyle}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        elevation: 2,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    }
});

export { Card };
