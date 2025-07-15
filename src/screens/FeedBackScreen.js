import { ImageBackground, StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, Alert, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
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
import { setFirstImage, setSecondImage } from '../store/slices/PictureSlice';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';





const FeedBackScreen = () => {
    const navigation = useNavigation();
    const [text, setText] = useState('')
    const routes = useRoute()
    const params = routes.params
    const dispatch = useDispatch()



    const onPressLogo = () => {
        navigation.navigate(Screens.welcomScreen)
        setText('')
        dispatch(setFirstImage(null));
        dispatch(setSecondImage(null));
    }

    const onPressSubmit = async () => {
        try {
            if (text === '') {
                Alert.alert('Error', "Please Write Some feedback first")

            } else {
                const result = await sendFeedback(params.id, text)
                if (result.status === 1) {
                    Alert.alert("Done", result.msg)
                    setText('')
                    navigation.navigate(Screens.welcomScreen)
                    dispatch(setFirstImage(null));
                    dispatch(setSecondImage(null));

                } else {
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

        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
            console.log('dismissing keyboard'); // To verify the press is detected
        }}>
            <View style={{ flex: 1 }}>
                <ImageBackground source={BGImage} resizeMode='repeat' style={styles.container}>
                    <KeyboardAwareScrollView style={styles.scrollView}>

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

                    </KeyboardAwareScrollView>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>

        // </KeyboardAvoidingView>
    )
}

export default FeedBackScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    scrollView: {
        // flexGrow: 1,
        paddingVertical: 50,
        paddingHorizontal: 20,
    },
    logoButton: {
        height: 80,
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
    },
    logImage: {
        width: '80%',
        height: '100%',
        resizeMode: 'contain',
    },
    upperTextContainer: {
        width: '100%',
        minHeight: 120,
        justifyContent: 'space-evenly',
        backgroundColor: COLORS.primaryDark,
        borderColor: COLORS.primaryColor,
        borderWidth: 3,
        borderRadius: 15,
        paddingHorizontal: '5%',
        paddingVertical: 15,
        marginBottom: 20,
    },
    headingText: {
        fontFamily: 'Bicyclette-Bold',
        color: 'white',
        alignSelf: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
    normalText: {
        color: COLORS.white,
        fontFamily: 'Bicyclette-Bold',
        fontSize: 18,
        textAlign: 'center'
    },
    input: {
        width: '100%',
        minHeight: 200,
        backgroundColor: COLORS.primaryDark,
        borderWidth: 3,
        borderColor: COLORS.primaryColor,
        borderRadius: 10,
        color: COLORS.white,
        padding: 15,
        marginBottom: 20,
        textAlignVertical: 'top',
    },
    patentText: {
        fontFamily: 'Round-Gothic',
        color: 'white',
        alignSelf: 'center',
        fontSize: 18,
        marginTop: 20,
    }
})