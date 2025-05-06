import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../assets/style/Color';

const ZoomButton = ({ returnValue, currentZoom, onZoomIn, onZoomOut, maxZoom }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={[
                    styles.button,
                    currentZoom >= maxZoom && styles.buttonDisabled
                ]}
                onPress={onZoomIn}
                disabled={currentZoom >= maxZoom}
            >
                <Icon name="plus" size={24} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity 
                style={[
                    styles.button,
                    currentZoom <= 0 && styles.buttonDisabled
                ]}
                onPress={onZoomOut}
                disabled={currentZoom <= 0}
            >
                <Icon name="minus" size={24} color={COLORS.white} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 20,
        top: '50%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 25,
        padding: 5,
    },
    button: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryColor,
        borderRadius: 20,
        margin: 5,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
});

export default ZoomButton;