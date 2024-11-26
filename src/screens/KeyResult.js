import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Image, Dimensions, FlatList, Alert,TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import BGImage from '../assets/images/bodyBg.jpg';
import LOGO from '../assets/images/idenikeyLogo.png'
import ViewSlider from 'react-native-view-slider'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { COLORS } from '../assets/style/Color';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNFS from 'react-native-fs'
import { FindKey } from '../hooks/api/findkey';
import SearchingAnimation from '../assets/images/findingYourKey.gif'
import { Screens } from '../navigations/Screens';
import { useDispatch } from 'react-redux';
import { setSecondImageFalse } from '../store/slices/imageSlice';

const { width, height } = Dimensions.get('screen');






const KeyResult = () => {
    const flatListRef = useRef()
    const [currentIndex, setCurrentIndex] = useState(0)
    const route = useRoute();
    const localPaths = route.params
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const dispatch = useDispatch()


    const FindKeyCheck = async () => {
        setLoading(true);
        try {
            const result = await FindKey(`${RNFS.DocumentDirectoryPath}/image_1.jpg`, localPaths.url);
            console.log('Full Result: ', result.records);

            // Limit the results to the first 5
            const limitedResults = result.ranking.slice(0, 5);
            console.log('Limited Result: ', limitedResults);

            setData(limitedResults);
            setLoading(false);
            dispatch(setSecondImageFalse());
        } catch (error) {
            Alert.alert('Error', 'Something went wrong');
            setLoading(false);
        }
    };


    const onPressNext = () => {
        if (currentIndex < data.length - 1) { // Check if not the last item
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
        }
    }

    const onPressBack = () => {
        if (currentIndex > 0) { // Check if not the first item
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
        }

    }

    const onPressFindNewKey = () => {
        navigation.navigate(Screens.welcomScreen)
    }
    const onPressLogo = () => {
        navigation.navigate(Screens.welcomScreen)
    }



    useEffect(() => {
        FindKeyCheck()

    }, [])
    return (
        <ImageBackground source={BGImage} resizeMode='repeat' style={styles.container}>
            <SafeAreaView style={styles.innerContainer}>
                {
                    loading ? <Image source={SearchingAnimation} style={styles.animationloading} resizeMode='contain' /> : null
                }
                {

                }
                <TouchableOpacity style={styles.logoButton} onPress={onPressLogo}>
                    <Image source={LOGO} resizeMode='contain' style={styles.logImage} />
                </TouchableOpacity>
                <View style={styles.slider}>
                    <View style={styles.sliderButtonContainer}>
                        {
                            currentIndex == 0 ? (<View style={{ width: '20%' }}></View>) : <PrimaryButton text={'<'} onPressFunction={onPressBack} />
                        }

                        <Text style={styles.imageNumber}>{currentIndex + 1}/{data.length}</Text>

                        {
                            currentIndex == 4 ? (<View style={{ width: '20%' }}></View>) : <PrimaryButton text={'>'} onPressFunction={onPressNext} />
                        }

                    </View>
                    <FlatList
                        refreshing={true}
                        ref={flatListRef}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        horizontal={true}
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.viewBox}>
                                <Text style={styles.imageNumber}>{item.productid}</Text>
                                <Image source={{ uri: item.image }} resizeMode='contain' style={{ width: '100%', height: '70%', borderWidth: 1, borderColor: COLORS.white, borderRadius: 10, }} />
                                <PrimaryButton text={'Buy Now'} onPressFunction={() => navigation.navigate('CLK', {
                                    source: item.url
                                })} />
                            </View>
                        )}
                    />

                </View>

                <PrimaryButton text={'Find a new key'} onPressFunction={onPressFindNewKey} />



            </SafeAreaView>

        </ImageBackground>

    )
}

export default KeyResult

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
    
    animationloading: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: width,
        height: height,
    },
    slider: {
        width: width / 1.1,
        height: '75%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'green'

    },
    viewBox: {
        // backgroundColor: 'green',
        // paddingHorizontal: 20,
        justifyContent: 'space-evenly',
        width: width / 1.1,
        padding: 10,
        alignItems: 'center',
        height: '100%'
    },
    sliderButtonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageNumber: {
        color: 'white',
        alignSelf: 'center',
        fontFamily: 'Bicyclette-Bold',
        fontSize: 18,
    },


})