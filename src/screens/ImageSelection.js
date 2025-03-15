import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect } from 'react';
import BGImage from '../assets/images/bodyBg.jpg';
import LOGO from '../assets/images/idenikeyLogo.png';
import { COLORS } from '../assets/style/Color';
import Icon from 'react-native-vector-icons/Feather'
import PrimaryButton from '../components/buttons/PrimaryButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Screens } from '../navigations/Screens';
import { useSelector, useDispatch } from 'react-redux';
import { setFirstImage, setSecondImage } from '../store/slices/PictureSlice';

const ImageSelection = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { firstPhoto, secondPhoto } = useSelector(state => state.photos);

  useEffect(() => {
    if (route.params?.imageUri) {
      // Only set the image in the box that was selected
      if (route.params.isFirstImage) {
        dispatch(setFirstImage(route.params.imageUri));
      } else {
        dispatch(setSecondImage(route.params.imageUri));
      }
    }
  }, [route.params?.imageUri]);

  const onPressTakeFirstImage = () => {
    dispatch(setFirstImage(null));
    navigation.navigate(Screens.cameraScreen, { isFirstImage: true });
  };

  const onPressTakeSecondImage = () => {
    dispatch(setSecondImage(null));
    navigation.navigate(Screens.cameraScreen, { isFirstImage: false });
  };

  const onPressFindThisKey = () => {
    if (!firstPhoto || !secondPhoto) {
      Alert.alert(
        "Missing Images",
        "Please take pictures of both sides of the key before proceeding.",
        [{ text: "OK" }]
      );
      return;
    }
    navigation.navigate(Screens.KeyResult)
  }

  const onPressLogo = () => {
    navigation.navigate(Screens.welcomScreen)
    dispatch(setFirstImage(null));
    dispatch(setSecondImage(null)); 
  }

  const renderImageBox = (photo, onPress, side) => {
    return (
      <TouchableOpacity 
        style={styles.imageBox}
        onPress={onPress}
      >
        {photo ? (
          <Image 
            source={{ uri: photo }} 
            style={styles.keyImage} 
            resizeMode="contain"
          />
        ) : (
          <>
            <Icon name="camera" size={50} color="white" />
            <Text style={styles.sideText}>TAKE IMAGE</Text>
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={BGImage} resizeMode='repeat' style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <TouchableOpacity style={styles.logoButton} 
          onPress={onPressLogo} >
          <Image source={LOGO} resizeMode='contain' style={styles.logImage} />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>YOUR IMAGES</Text>
        </View>

        <View style={styles.imagesContainer}>
          <View style={styles.sideContainer}>
            {renderImageBox(firstPhoto, onPressTakeFirstImage, 'SIDE 1')}
            <Text style={styles.sideLabel}>SIDE 1</Text>
            <TouchableOpacity onPress={onPressTakeFirstImage}>
              <Text style={styles.replaceText}>replace</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sideContainer}>
            {renderImageBox(secondPhoto, onPressTakeSecondImage, 'SIDE 2')}
            <Text style={styles.sideLabel}>SIDE 2</Text>
            <TouchableOpacity onPress={onPressTakeSecondImage}>
              <Text style={styles.replaceText}>replace</Text>
            </TouchableOpacity>
          </View>
        </View>

        <PrimaryButton
          text={'FIND THIS KEY'}
          onPressFunction={onPressFindThisKey}
        />

        <Text style={styles.patentText}>Patent Pending</Text>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  innerContainer: {
    height: '100%',
    width: '95%',
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
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  headerText: {
    color: COLORS.white,
    fontSize: 24,
    fontFamily: 'Bicyclette-Bold'
  },
  imagesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  sideContainer: {
    width: '48%',
    alignItems: 'center',
    gap: 10,
  },
  imageBox: {
    width: '100%',
    // height: 300,
    aspectRatio: 1,
    backgroundColor: COLORS.primaryColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  sideText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Bicyclette-Bold'
  },
  sideLabel: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: 'Bicyclette-Bold'
  },
  replaceText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: 'Bicyclette-Bold'
  },
  findKeyButton: {
    backgroundColor: COLORS.primaryColor,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: '80%',
  },
  findKeyText: {
    color: COLORS.white,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Bicyclette-Bold'
  },
  patentText: {
    fontFamily: 'FontsFree-Net-All-Round-Gothic-W01-Book',
    color: 'white',
    fontSize: 18,
  },
  keyImage: {
    width: '90%',
    height: '90%',
    borderRadius: 10,
  },
});

export default ImageSelection; 