import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BGImage from '../assets/images/bodyBg.jpg';
import LOGO from '../assets/images/idenikeyLogo.png'
import { COLORS } from '../assets/style/Color';
import KeyImage from '../assets/images/keyimg.png'
import CamereImage from '../assets/images/cameraIcon.png'
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../navigations/Screens';
import Icon from 'react-native-vector-icons/Feather'
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import instructionSlider from '../components/instructions/InstructionSlider';
import InstructionSlider from '../components/instructions/InstructionSlider';
import { useDispatch } from 'react-redux';
import { setFirstImage, setSecondImage } from '../store/slices/PictureSlice';

const TakePictureScreen = () => {
    const navigation = useNavigation();
    const [openModel, setOpenModel] = useState(true)
    const dispatch = useDispatch()


    const onPressTakePhoto = () => {
        navigation.navigate(Screens.ImageSelection)

  


    }

    const onPressLogo = () => {
        dispatch(setFirstImage(null))
        dispatch(setSecondImage(null))
        navigation.navigate(Screens.welcomScreen)
    }
    return (
        <ImageBackground source={BGImage} resizeMode='repeat' style={styles.container}>
            <SafeAreaView style={styles.innerContainer} >
                <TouchableOpacity style={styles.logoButton} onPress={onPressLogo}>
                    <Image source={LOGO} resizeMode='contain' style={styles.logImage} />
                </TouchableOpacity>
                <View style={styles.tagLineView}>
                    <Text style={styles.takePictureText}>Take a picture of the key</Text>
                </View>
                <Image source={KeyImage} resizeMode='contain' style={styles.keyImage} />
                <TouchableOpacity style={styles.takePictureButton} onPress={onPressTakePhoto}>
                    <Image source={CamereImage} resizeMode='contain' style={styles.cameraImage} />
                    <Text style={styles.takePhotoText}>TAKE PHOTO</Text>
                </TouchableOpacity>
                <Text style={styles.patentText}>Patent Pending</Text>
            </SafeAreaView>

            {/* {
                openModel ? <InstructionSlider /> : null
            } */}
        </ImageBackground>
    )
}

export default TakePictureScreen

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
    tagLineView: {
        width: '100%',
        backgroundColor: COLORS.primaryColor,
        height: '8%',
        justifyContent: 'center',
        alignItems: 'center'

    },
    takePictureText: {
        fontSize: 20,
        fontWeight: '500',
        // textAlignVertical: 'center',
        color: COLORS.white,
        fontFamily: 'Bicyclette-Regular'
    },
    keyImage: {
        width: '60%',
        height: '35%',
        // backgroundColor: 'green'
    },
    takePictureButton: {
        width: '50%',
        height: '12%',
        backgroundColor: COLORS.primaryColor,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 20,
    },
    cameraImage: {
        width: '60%',
        height: '40%'
    },
    takePhotoText : {
        color: COLORS.white,
        fontSize: 18,
        fontFamily: 'Bicyclette-Bold'
    },
    patentText: {
        fontFamily: 'FontsFree-Net-All-Round-Gothic-W01-Book',
        color: 'white',
        alignSelf: 'center',
        fontSize: 18,
    }

})