import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../assets/style/Color'
import PrimaryButton from '../buttons/PrimaryButton'
import { useNavigation } from '@react-navigation/native'
import { Screens } from '../../navigations/Screens'

const CustomeAlert = ({cancelfunction}) => {
    const navigation = useNavigation()

    const onPressHowToUse= () => {
        navigation.navigate('CLK', {
            source : 'https://clksupplies.com/pages/how-to-use-idenikey'
        })
    }


    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => cancelfunction(false)}>
                    <Text style={styles.cancelText}>X</Text>
                </TouchableOpacity>
                <PrimaryButton text={'HOW TO USE'} onPressFunction={onPressHowToUse} />
            </View>

        </View>
    )
}

export default CustomeAlert

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignSelf: 'center',
        width: '90%',
        height: 170,
        backgroundColor: COLORS.black,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: COLORS.primaryColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        width: '80%',
        height: '70%',
        justifyContent: 'space-evenly',
        //  backgroundColor: 'green'
    },
    cancelButton: {
        height: 40,
        width: 40,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryColor,
        alignSelf: 'flex-end'
    },
    cancelText: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: 'bold'
    }

})