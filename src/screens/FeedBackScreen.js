import { ImageBackground, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import BGImage from '../assets/images/bodyBg.jpg';
import { useNavigation, useRoute } from '@react-navigation/native';
import LOGO from '../assets/images/idenikeyLogo.png'
import { COLORS } from '../assets/style/Color';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { Screens } from '../navigations/Screens';
import { sendFeedback } from '../hooks/api/feedback';
import { all } from 'axios';





const FeedBackScreen = () => {
    const navigation = useNavigation();
    const [text, setText] = useState('')
    const routes = useRoute()
    const params = routes.params




    const onPressLogo = () => {
        navigation.navigate(Screens.welcomScreen)
    }

    const onPressSubmit = async () => {
        try {
            if (text === '') {
                Alert.alert('Error', "Please Write Some feedback first")

            } else {
                const result = await sendFeedback(params.id, text)
                if(result.status ===  1){
                    Alert.alert("Done", result.msg)
                    setText('')
                    navigation.navigate(Screens.welcomScreen)
                }else{
                    Alert.alert('Error', "Already FeedBack Provided on this Key")
                    setText('')
                }
                
            }

        } catch (err) {
            Alert.alert("Error", "error posting feedback!")
        }
    }


    useEffect(() => {
        console.log('Data from prev Screen: ', params.id)
    }, [])

    return (
        <ImageBackground source={BGImage} resizeMode='repeat' style={styles.container}>
            <SafeAreaView style={styles.innerContainer} >
                <TouchableOpacity style={styles.logoButton} onPress={onPressLogo}>
                    <Image source={LOGO} resizeMode='contain' style={styles.logImage} />
                </TouchableOpacity>

                <View style={styles.upperTextContainer}>
                    <Text style={styles.headingText}>WE'D LIKE YOUR HELP!</Text>
                    <Text style={styles.normalText}>Please tell us as much as you can about this key</Text>
                </View>
                <TextInput
                    style={styles.input}

                    placeholderTextColor={COLORS.white}
                    multiline={true}
                    value={text}
                    onChangeText={setText}
                />
                <PrimaryButton text={'SUBMIT'} onPressFunction={onPressSubmit} />
                <Text style={styles.patentText}>Patent Pending</Text>

            </SafeAreaView>


        </ImageBackground>
    )
}

export default FeedBackScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    innerContainer: {
        height: '100%',
        width: '95%',
        // backgroundColor: 'green',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    logoButton: {
        height: '10%',
        width: '600%'
    },
    logImage: {
        width: '100%',
        height: '100%',
    },
    upperTextContainer: {
        width: '100%',
        height: '15%',
        justifyContent: 'space-evenly',
        backgroundColor: COLORS.primaryDark,
        borderColor: COLORS.primaryColor,
        borderWidth: 3,
        borderRadius: 15,
        paddingHorizontal: '10%',
    },
    headingText: {
        fontFamily: 'Bicyclette-Bold',
        color: 'white',
        alignSelf: 'center',
        fontSize: 20,
    },
    normalText: {
        color: COLORS.white,
        fontFamily: 'Bicyclette-Bold',
        fontSize: 18,
        textAlign: 'center'
    },
    input: {
        width: '100%',
        height: '40%',
        backgroundColor: COLORS.primaryDark,
        borderWidth: 3,
        borderColor: COLORS.primaryColor,
        borderRadius: 10,
        color: COLORS.white,
        padding: '5%',

    },
    patentText: {
        fontFamily: 'Round-Gothic',
        color: 'white',
        alignSelf: 'center',
        fontSize: 18
    }


})