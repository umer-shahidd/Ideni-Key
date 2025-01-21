import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Slider from '@react-native-community/slider'
import { COLORS } from '../../assets/style/Color'
import Icon from 'react-native-vector-icons/Entypo'

const ZoomSlider = ({ returnValue }) => {
    const [value, setValue] = useState(0)


    const onPressMinus = () => {
        if (value > 0) {
            setValue(value - 0.2)
            returnValue(value - 0.2)
        }

    }


    const onPressPlus = () => {
        if (value < 1) {
            returnValue(value + 0.2);
            setValue(value + 0.2)
        }
    }
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.minusSignButton} onPress={onPressMinus}>
                <Icon name='minus' size={20} color={COLORS.white} />
            </TouchableOpacity>

            <Slider style={styles.slider}
            
                thumbTintColor={COLORS.primaryColor}
                minimumTrackTintColor={COLORS.primaryColor}
                vertical={false}
                step={0.01}
                value={value}
                maximumValue={1}
                minimumValue={0}
                onValueChange={(number) => {
                    setValue(number)
                    returnValue(number)
                }}
            />

            <TouchableOpacity style={styles.minusSignButton} onPress={onPressPlus}>
                <Icon name='plus' size={20} color={COLORS.white} />
            </TouchableOpacity>

        </View>
    )
}

export default ZoomSlider

const styles = StyleSheet.create({
    container: {
        width: '35%',
        height: '7%',
        bottom: '55%',
        left: '74%',
        // backgroundColor: 'green',
        position: 'absolute',
        zIndex: 1,
        transform: [{ rotate: '270deg' }],
        flexDirection: 'row',
        alignItems: 'center'
    },
    minusSignButton: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '270deg' }],
        // backgroundColor: 'green'
    },
    slider: {
        width: '100%',
        height: '100%',

        // backgroundColor: 'blue',

    }
})