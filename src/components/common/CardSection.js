import React from 'react';
import { View } from 'react-native';

/**
 * CardSection Component
 * @param {Object} props : An object that contains a style property 
 *                      for the card section
 */
const CardSection = (props) => {
    return (
        <View style={[styles.containerStyle, props.style]}>
            {props.children}
        </View>
    );
};

/**
 * Default styling for the CardSection component
 */
const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};

export { CardSection };

