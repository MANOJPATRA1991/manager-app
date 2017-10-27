import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

class Button extends Component {
    render() {
        const { onPress } = this.props;
        const { buttonStyles, textStyle } = styles;
        return (
            <TouchableOpacity style={buttonStyles} onPress={onPress}>
                <Text style={textStyle}>
                    {this.props.children}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyles: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007AFF',
        marginLeft: 5,
        marginRight: 5
    }
};

export { Button };
