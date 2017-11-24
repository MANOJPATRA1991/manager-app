import React from 'react';
import { View, ActivityIndicator } from 'react-native';

/**
 * Spinner Component
 * @param {Object} param0 : An object containing a size property for the spinner size 
 */
const Spinner = ({ size }) => {
    return (
        <View style={styles.spinnerStyle}>
            <ActivityIndicator size={size || 'large'} />
        </View>
    );
};

/**
 * Default styling for the Spinner Component
 */
const styles = {
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export { Spinner };
