import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/style/Color'

const PrimaryButton = ({text, onPressFunction}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressFunction}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
    container: {
        width: 'auto',
        paddingHorizontal: '10%',
        height: 60,
        alignSelf: 'center',
        backgroundColor: COLORS.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    text: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'Bicyclette-Bold',
        textAlign: 'center'

    }
})