import { ActivityIndicator, Alert, Image, StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS } from '../assets/style/Color'
import { useNavigation, useRoute } from '@react-navigation/native'
import RNFS, { stat } from 'react-native-fs'
import { detectImage } from '../hooks/api/model'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import ScannerGif from '../assets/animations/scanner.gif'
import RBSheet from 'react-native-raw-bottom-sheet'
import { FindKey } from '../hooks/api/findkey'
import { Screens } from '../navigations/Screens'
import { storeImageLocally } from '../services/storeImagelocally'
import BGImage from '../assets/images/bodyBg.jpg'
import Icon from 'react-native-vector-icons/Entypo'
import PrimaryButton from '../components/buttons/PrimaryButton'
import { useDispatch, useSelector } from 'react-redux'
import NetInfo from '@react-native-community/netinfo';
import { setFirstImage, setSecondImage } from '../store/slices/PictureSlice'


const { height, width } = Dimensions.get('window')



const DummyViewScreen = () => {
  const route = useRoute()
  const data = route.params
  const [loading, setloading] = useState(true)
  const rbsheetRef = useRef();
  const navigation = useNavigation()
  const second = useSelector(state => state.second.second)
  const dispatch = useDispatch()
  const {firstPhoto, secondPhoto} = useSelector( state => state.photos)


  useEffect(() => {
    console.log('SeconfImage:', second)
  }, [])




  const convertToBase64AndDetect = async (localFilePath) => {

    // This is the first procedure
    // try {
    //   setloading(true)
    //   const base64Image = await RNFS.readFile(localFilePath, 'base64');
    //   // console.log('Base', base64Image)
    //   detectImage(base64Image).then((res) => {

    //     if (Array.isArray(res.records[0]._objects) && res.records[0]._objects.length > 0) {
    //       setloading(false)
    //       if (res.records[0]._objects[0].prob > 0.5) {
    //         if (second) {
    //           dispatch(setSecondImage(localFilePath))
    //           navigation.navigate(Screens.viewImagesScreen, { url: localFilePath })
    //         } else {
    //           dispatch(setFirstImage(localFilePath))
    //           storeImageLocally(localFilePath)
    //           navigation.navigate(Screens.TakesecondPhoto)
    //         }

    //       } else {
    //         rbsheetRef.current.open()
    //       }

    //     } else {
    //       setloading(false)
    //       rbsheetRef.current.open()
    //     }
    //   }).catch((err) => {
    //     setloading(false)
    //     console.log('Error', err)
    //   })
    // } catch (error) {
    //   console.error('Error converting image to Base64:', error);
    // }


    try {
      setloading(true)
      const base64Image = await RNFS.readFile(localFilePath, 'base64');
      
      detectImage(base64Image).then((res) => {

        if (Array.isArray(res.records[0]._objects) && res.records[0]._objects.length > 0) {
          setloading(false)
          if (res.records[0]._objects[0].prob > 0.5) {
            if (firstPhoto === null) {
              dispatch(setFirstImage(localFilePath))
              if(secondPhoto !== null){
                navigation.navigate(Screens.viewImagesScreen)
              }else{
                navigation.navigate(Screens.TakesecondPhoto)
              }
            } else if(secondPhoto === null) {
              dispatch(setSecondImage(localFilePath))
              navigation.navigate(Screens.viewImagesScreen)
            }else{
              navigation.navigate(Screens.viewImagesScreen)
            }

          } else {
            rbsheetRef.current.open()
          }

        } else {
          setloading(false)
          rbsheetRef.current.open()
        }
      }).catch((err) => {
        setloading(false)
        console.log('Error', err)
      })
    } catch (error) {
      console.error('Error converting image to Base64:', error);
    }
  };

  const onPressSeeInstruction = () => {
    rbsheetRef.current.close()
    navigation.navigate(Screens.instructionScreen)
  }

  const onPressTryAgain = () => {
    rbsheetRef.current.close()
    navigation.navigate(Screens.cameraScreen)
  }

  const onPressRetake = () => {
    navigation.navigate(Screens.welcomScreen)
  }





  const FindKeyCheck = async () => {

    FindKey(data.url, data.url).then((res) => {
      console.log("This is API:", res)
    }
    )
  }
  useEffect(() => {
    console.log(data)
    convertToBase64AndDetect(data.url)
    if (firstPhoto === null) {
      dispatch(setFirstImage(data.url))
      if(secondPhoto !== null){
        navigation.navigate(Screens.viewImagesScreen)
      }else{
        navigation.navigate(Screens.TakesecondPhoto)
      }
    } else if(secondPhoto === null) {
      dispatch(setSecondImage(data.url))
      navigation.navigate(Screens.viewImagesScreen)
    }else{
      navigation.navigate(Screens.viewImagesScreen)
    }
    // rbsheetRef.current.open()
    // FindKeyCheck();
  }, [])

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert(
          "No Internet Connection",
          "Please check your internet connection and try again.",
          [{ text: "OK" }]
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <ImageBackground source={BGImage} resizeMode='repeat' style={styles.container}>

      <View style={styles.imageView}>
        <View style={styles.border1}></View>
        <View style={styles.border2}></View>
        <View style={styles.border3}></View>
        <View style={styles.border4}></View>

        {
          loading ? <Image source={ScannerGif} resizeMode='stretch' style={styles.scanner} /> : null


        }
        <Image source={{ uri: data.url }} style={styles.iamge} />
      </View>


      <PrimaryButton text={'Retake'} onPressFunction={onPressRetake} />


      <RBSheet
        ref={rbsheetRef}
        customStyles={{
          wrapper: {

          },
          container: {
            backgroundColor: COLORS.white,
            width: '100%',
            height: height / 1.6,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }

        }}
      >
        <View style={styles.wrongContainer}>
          <Icon name='circle-with-cross' color={'red'} size={50} />
          <Text style={styles.instructionText}>The image taken is not clear</Text>
          <Text style={styles.instructionText}>Please see the instructions which can help in understanding and try again</Text>
          <PrimaryButton text={'See Instruction -->'} onPressFunction={onPressSeeInstruction} />
          <PrimaryButton text={' <--  Try Again'} onPressFunction={onPressTryAgain} />

        </View>

      </RBSheet>


    </ImageBackground>
  )
}

export default DummyViewScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageView: {
    width: '80%',
    height: '70%',
    marginBottom : 40,
    // borderWidth: 1,
    // borderColor: Colors.white,
    borderRadius: 10,
    // overflow: 'hidden'
    // backgroundColor: 'green'
  },
  scanner: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    // backgroundColor: 'green'
  },
  iamge: {
    width: '100%',
    height: '100%',

  },
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },

  wrongContainer: {
    alignSelf: 'center',
    width: '90%',
    height: '80%',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  instructionText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    // textAlignVertical: 'center',
    color: COLORS.primaryColor,
    fontFamily: 'Bicyclette-Regular'
  },
  border1: {
    position: "absolute",
    zIndex: 2,
    height: 50, width: 50,
    top: -10, left: -10,
    borderColor: COLORS.primaryColor,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  border2: {
    position: "absolute",
    zIndex: 2,
    height: 50, width: 50,
    right: -10, top: -10,
    borderColor: COLORS.primaryColor,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  border3: {
    position: "absolute",
    zIndex: 2,
    height: 50, width: 50,
    bottom: -10, left: -10,
    borderColor: COLORS.primaryColor,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  border4: {
    position: "absolute",
    zIndex: 2,
    height: 50, width: 50,
    bottom: -10, right: -10,
    borderColor: COLORS.primaryColor,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
})