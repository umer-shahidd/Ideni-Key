import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RNCamera } from 'react-native-camera';
import { COLORS } from '../assets/style/Color';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Screens } from '../navigations/Screens';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker'
import Slider from '@react-native-community/slider';
import ZoomSlider from '../components/slider/ZoomSlider';
import InstructionSlider from '../components/instructions/InstructionSlider';
import BottomBorder from '../components/CameraScreenGuides/BottomBorder';
import TopBorder from '../components/CameraScreenGuides/TopBorder';
import Key from '../components/CameraScreenGuides/Key';
import TopInstructionText from '../components/CameraScreenGuides/TopInstructionText';
import BottomInstructionText from '../components/CameraScreenGuides/BottomInstructionText';
import { useSelector, useDispatch } from 'react-redux';
import ZoomButton from '../components/zoomButtons/ZoomButton';
import { setFirstImage, setSecondImage } from '../store/slices/PictureSlice';

const {height} = Dimensions.get('window')

const getOrientation = () => {
    const { width, height } = Dimensions.get('window');
    return width > height ? 'LANDSCAPE' : 'PORTRAIT';
  };

// Add zoom step constant at the top with other constants
const ZOOM_STEP = 0.001; // Smaller step for smoother zoom
const MAX_ZOOM = 0.2;    // Limit maximum zoom to prevent extreme jumps

const CameraScreen = () => {
    const cameraRef = useRef(null);
    const [imageUri, setImageUri] = useState([]); 
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const { isFirstImage = true } = route.params || {};
    const [zoom, setZoom] = useState(0.001);
    const [openModel, setOpenModel] = useState(true)
    const [showKey, setShowKey] = useState(true)
    const [isZooming, setIsZooming] = useState(false);
    const second = useSelector(state => state.second.second)

    useEffect( () => {
        console.log('Second:', second)
    }, [])

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                setImageUri(data.uri);
                
                // Set the image in Redux based on which side was selected
                if (isFirstImage) {
                    dispatch(setFirstImage(data.uri));
                } else {
                    dispatch(setSecondImage(data.uri));
                }

                navigation.navigate('ImageSelection', {
                    imageUri: data.uri,
                    isFirstImage: isFirstImage
                });
            } catch (err) {
                console.log('err: ', err);
            }
        }
    };

    const onPressInstruction = () => {
        navigation.navigate(Screens.instructionScreen)
    }

    const openGalleryButton = async () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets) {
                const selectedImageUri = response.assets[0].uri;
                setImageUri(selectedImageUri);
                
                // Set the image in Redux based on which side was selected
                if (isFirstImage) {
                    dispatch(setFirstImage(selectedImageUri));
                } else {
                    dispatch(setSecondImage(selectedImageUri));
                }

                navigation.navigate('ImageSelection', {
                    imageUri: selectedImageUri,
                    isFirstImage: isFirstImage
                });
            }
        });
    }

    useEffect( () => {
        console.log('getOrientation: ', getOrientation())
        setTimeout( () =>{
            setShowKey(false)
        } , 3000)
    }, )

    const handleZoom = (newZoom) => {
        // Optimize zoom calculation for better performance
        const clampedZoom = Math.min(Math.max(newZoom, 0), MAX_ZOOM);
        // Use a larger step for Android to make it more responsive
        const roundedZoom = Platform.OS === 'android' 
            ? Math.round(clampedZoom * 100) / 100  // Less precise but faster on Android
            : Math.round(clampedZoom * 1000) / 1000; // More precise for iOS
        setZoom(roundedZoom);
    };
    
    const zoomIn = () => {
        // Different step sizes for Android and iOS
        const step = Platform.OS === 'android' ? ZOOM_STEP * 2 : ZOOM_STEP;
        handleZoom(zoom + step);
    };
    
    const zoomOut = () => {
        // Different step sizes for Android and iOS
        const step = Platform.OS === 'android' ? ZOOM_STEP * 2 : ZOOM_STEP;
        handleZoom(zoom - step);
    };

    return (
        <SafeAreaView style={styles.container}>
            <RNCamera
                ref={cameraRef}
                style={styles.preview}
                focusable={true}
                zoom={zoom}
                maxZoom={MAX_ZOOM}
                focusDepth={1}
                captureAudio={false}
                useNativeZoom={true}
                type={RNCamera.Constants.Type.back}
                autoFocus={RNCamera.Constants.AutoFocus.on}
                orientation={RNCamera.Constants.Orientation.portrait}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            >
                <View style={styles.overlay}>
                    <TopInstructionText />
                    <TopBorder />
                    {showKey ? (
                        <View style={[
                            !isFirstImage && { transform: [{ scaleX: -1 }] }
                        ]}>
                            <Key />
                        </View>
                    ) : (
                        <View style={{height: height/2 }}></View>
                    )}
                    <BottomBorder />
                    <BottomInstructionText />
                </View>
            </RNCamera>

            <ZoomButton 
                returnValue={handleZoom} 
                currentZoom={zoom}
                onZoomIn={zoomIn}
                onZoomOut={zoomOut}
                maxZoom={MAX_ZOOM}
            />
            
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.galleryButton} onPress={openGalleryButton}>
                    <Icon name={'image'} size={40} color={COLORS.primaryColor} />
                    <Text style={styles.buttonText}>Photos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.capture} onPress={takePicture}>
                    <View style={styles.captureButtonInner}>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.galleryButton} onPress={onPressInstruction}>
                    <Icon name={'help-rhombus'} size={40} color={COLORS.primaryColor} />
                    <Text style={styles.buttonText}>Instructions</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CameraScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonContainer: {
        // position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 100,
        // zIndex: 1,
        // backgroundColor: 'rgba(0,0,0,0.7)',
        backgroundColor: COLORS.white,
        paddingHorizontal: '5%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'

    },
    buttonText: {
        color: COLORS.primaryColor,
        fontSize: 12,
    },
    galleryButton: {
        width: 80,
        height: 70,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    capture: {
        height: 70,
        width: 70,
        backgroundColor: COLORS.primaryColor,
        borderRadius: 70,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButtonInner: {
        height: 60,
        width: 60,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: COLORS.white
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        // backgroundColor: 'green',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        zIndex: 1,
    },
    upperBorder: {
        position: 'absolute',
        width: '100%',
        height: '10%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderBottomColor: 'red',
        borderBottomWidth: 2,
        top: 0,
    },
    leftBorder: {
        position: 'absolute',
        width: '20%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRightColor: 'red',
        borderRightWidth: 2,
        top: 0,
        left: 0,
    },
    rightBorder: {
        position: 'absolute',
        width: '20%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderLeftColor: 'red',
        borderLeftWidth: 2,
        top: 0,
        right: 0,
    },
    bottomBorder: {
        position: 'absolute',
        width: '100%',
        height: '10%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderTopColor: 'red',
        borderTopWidth: 2,
        bottom: 0,
        right: 0,
    },
    capturedImage: {
        width: '100%',
        height: 300, // Adjust height as needed
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 0, // Position it as needed
        left: 0,
    }
});
