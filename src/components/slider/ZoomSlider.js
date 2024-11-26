import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Slider from '@react-native-community/slider'
import { COLORS } from '../../assets/style/Color'

const ZoomSlider = ({returnValue}) => {
    return (
        <View style={styles.container}>
            <Slider style={styles.slider}
                thumbTintColor={COLORS.primaryColor}
                minimumTrackTintColor={COLORS.primaryColor}
                vertical={false}
                step={0.1}
                maximumValue={5}
                minimumValue={0}
                onValueChange={(number) => {
                    returnValue(number)
                    console.log('Number:', number)
                }}
                 />
                
                
                
        </View>
    )
}

export default ZoomSlider

const styles = StyleSheet.create({
    container: {
        width: '35%',
        height: '6%',
        bottom: '55%',
        left: '74%',
        // backgroundColor: 'green',
        position: 'absolute',
        zIndex: 1,
        transform: [{ rotate: '270deg' }],
    },
    slider: {
        width: '100%',
        height: '100%',
    
        // backgroundColor: 'blue',

    }
})