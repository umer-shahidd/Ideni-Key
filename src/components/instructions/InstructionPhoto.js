import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/style/Color'
import Icon from 'react-native-vector-icons/Entypo'

const InstructionPhoto = ({ img, correct, type, faraway }) => {
    return (
        <View style={styles[`container_${type}`]}>
            <Image source={img} resizeMode='contain' style={styles.image} />
            {
                correct ? <View style={styles.correctContainer}>
                    <Icon name='check' size={30} color={COLORS.white} />
                </View> : <View style={styles.incorrectContainer}>
                    <Icon name='cross' size={30} color={COLORS.white} />
                </View>

            }
        </View>
    )
}

export default InstructionPhoto

const styles = StyleSheet.create({
    container_PRIM: {
        width: '40%',
        height: '90%',
        borderWidth: 1,
        borderColor: COLORS.white,
        borderRadius: 10,
        // backgroundColor: COLORS.primaryDark,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container_SEC: {
        width: '90%',
        height: '80%',
        borderWidth: 1,
        borderColor: COLORS.white,
        borderRadius: 10,

        // backgroundColor: COLORS.primaryDark,`
         justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
       borderRadius: 10,
    },
  
    correctContainer: {
        position: 'absolute',
        bottom: -10,
        right: -10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    incorrectContainer: {
        position: 'absolute',
        bottom: -10,
        right: -5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        width: 30,
        height: 30,
        borderRadius: 20,
    }

})