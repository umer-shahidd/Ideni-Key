import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BGImage from '../assets/images/bodyBg.jpg'
import Logo from '../assets/images/idenikeyLogo.png'
import infoBtn from '../assets/images/infoButton.png'
import IntroAnimation from '../assets/images/ideniIntroAnimation.gif'
import PrimaryButton from '../components/buttons/PrimaryButton'
import CustomeAlert from '../components/alert/CustomeAlert'
import { useNavigation } from '@react-navigation/native'
import { Screens } from '../navigations/Screens'
import { detectImage } from '../hooks/api/model'
import { SafeAreaView } from 'react-native-safe-area-context'

const WelcomScreen = () => {
    const [alert, setAlert] = useState(false)
     const navigation = useNavigation()

     
    const onPressInfo = () => {
        setAlert(true)
    }

    const onPressFindAKey = () => {
        navigation.navigate(Screens.ImageSelection)

    }


    return (
        <ImageBackground source={BGImage} resizeMode='repeat' style={styles.container}>

            <SafeAreaView style={styles.innerContainer}>
                <TouchableOpacity style={styles.infoButton} onPress={onPressInfo}>
                    <Image source={infoBtn} resizeMode='contain' style={styles.infoImage} />
                </TouchableOpacity>
                <Image source={Logo} resizeMode='contain' style={styles.logoImage} />
                <Image source={IntroAnimation} resizeMode='contain' style={styles.introAnimation} />
                <PrimaryButton  text={'FIND A KEY'} onPressFunction={onPressFindAKey}/>
                <Text style={styles.patentText}>Patent pending</Text>
            </SafeAreaView>
            {
               alert ? <CustomeAlert cancelfunction={setAlert}/> : null
            }
            

        </ImageBackground>
    )
}

export default WelcomScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start'
        // justifyContent: 'space-between',
    },
    innerContainer: {
        width: '100%',
        height: '95%',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'green'
    },
    infoButton: {
        width: '20%',
        height: '6%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    infoImage: {
        width: '90%',
        height: '90%',
        alignSelf: 'flex-end'
    },
    logoImage: {
        width: '90%',
        height: '10%',
        // backgroundColor: 'green',
        alignSelf: 'center'
    },
    introAnimation: {
        width: '90%',
        height: '60%',
        alignSelf: 'center'
    },
    patentText: {
        fontFamily: 'Round-Gothic',
        color: 'white',
        alignSelf: 'center',
        fontSize: 18
    }
})