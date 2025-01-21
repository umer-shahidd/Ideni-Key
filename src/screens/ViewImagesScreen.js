import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import BGImage from '../assets/images/bodyBg.jpg';
import { useNavigation } from '@react-navigation/native';
import LOGO from '../assets/images/idenikeyLogo.png'
import { COLORS } from '../assets/style/Color';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { Screens } from '../navigations/Screens';
import RNFS from 'react-native-fs'
import { useDispatch, useSelector } from 'react-redux';
import { setFirstImage, setSecondImage } from '../store/slices/PictureSlice';



const ViewImagesScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const {firstPhoto, secondPhoto} = useSelector( state => state.photos)

    const onPressFindthisKey= () => {
        navigation.navigate(Screens.KeyResult)
    }

    const onPressLogo = () => {
        dispatch(setFirstImage(null))
        dispatch(setSecondImage(null))
        navigation.navigate(Screens.welcomScreen)
    }


    const onPressReplaceFirstImage = () => {
        dispatch(setFirstImage(null))
        navigation.navigate(Screens.cameraScreen)
    }

    const onPressReplaceSecondImage = () => {
        dispatch(setSecondImage(null))
        navigation.navigate(Screens.cameraScreen)

    }



    useEffect( () => {
        
    }, [])
  return (
    <ImageBackground source={BGImage} resizeMode='repeat' style={styles.container}>
    <SafeAreaView style={styles.innerContainer} >
        <TouchableOpacity style={styles.logoButton} onPress={onPressLogo}>
            <Image source={LOGO} resizeMode='contain' style={styles.logImage} />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
            <Text style={styles.yourimageText}>YOUR IMAGES</Text>
        </View>
        <View style={styles.imageContainer}>
            <View style={styles.imageView}>
                <Image src={firstPhoto} style={styles.images} />
                <TouchableOpacity onPress={onPressReplaceFirstImage}>
                    <Text style={styles.replaceButtonText}>replace</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageView}>
                <Image src={secondPhoto} style={styles.images} />
                <TouchableOpacity onPress={onPressReplaceSecondImage}>
                    <Text style={styles.replaceButtonText}>replace</Text>
                </TouchableOpacity>
                
            </View>
            
            

        </View>
        <PrimaryButton text={'FIND THIS KEY'} onPressFunction={onPressFindthisKey} />


        
        <Text style={styles.patentText}>Patent Pending</Text>
    </SafeAreaView>

    
</ImageBackground>
  )
}

export default ViewImagesScreen

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
    headerContainer: {
        backgroundColor: COLORS.primaryColor,
        width: '65%',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    yourimageText: {
        color: COLORS.white,
        fontSize: 24,
        fontFamily: 'Bicyclette-Bold'
    },
    imageContainer: {
        width: '95%',
        height: '45%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'green'

    },
    imageView: {
        width: '47%',
        height: '100%',
        justifyContent:'space-around',
        alignItems : 'center'
    },
    images: {
        width: '100%',
        height: '70%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.primaryColor,

    },
    replaceButtonText: {
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