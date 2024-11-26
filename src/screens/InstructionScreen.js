import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import InstructionSlider from '../components/instructions/InstructionSlider'
import BGImage from '../assets/images/bodyBg.jpg'
import Instructions from '../assets/images/instruction.png'
import InstructionPhoto from '../components/instructions/InstructionPhoto'
import PrimaryButton from '../components/buttons/PrimaryButton'
import { COLORS } from '../assets/style/Color'
import CorrectImage from '../assets/images/keyinstructions/correct.jpg'
import FarAway from '../assets/images/keyinstructions/far.jpg'
import UpSide from '../assets/images/keyinstructions/upside.jpg'
import Blury from '../assets/images/keyinstructions/blurry.jpg'
import SideWay from '../assets/images/keyinstructions/side.jpg'
import Held from '../assets/images/keyinstructions/held.jpg'
import Angle from '../assets/images/keyinstructions/angle.jpg'
import { useNavigation } from '@react-navigation/native'
import { Screens } from '../navigations/Screens'



const InstructionScreen = () => {

    const navigation = useNavigation()
    return (
        <ImageBackground source={BGImage} resizeMode='repeat' style={styles.container}>
            <SafeAreaView style={styles.innerContainer}>
                <Text style={styles.headingText}>Correct Photo example:</Text>
                <View style={styles.correctContainer}>
                    <InstructionPhoto type={'PRIM'} img={CorrectImage} correct={true} />
                </View>

                <Text style={styles.headingText}>
                    Photos that will <Text style={{ textDecorationLine: 'underline', color: 'red' }}> NOT</Text> Work
                </Text>

                <View style={styles.wrongContainer}>
                    <View style={styles.imageView}>
                        <InstructionPhoto type={'SEC'} correct={false} img={FarAway} faraway={true} />
                        <Text style={styles.explainText}>Far Away</Text>
                    </View>
                    <View style={styles.imageView}>
                        <InstructionPhoto type={'SEC'} correct={false} img={UpSide} />
                        <Text style={styles.explainText}>UpSide Down</Text>
                    </View>
                    <View style={styles.imageView}>
                        <InstructionPhoto type={'SEC'} correct={false} img={Blury} />
                        <Text style={styles.explainText}>Blurry</Text>
                    </View>
                    {/*                     
                    <InstructionPhoto type={'SEC'} correct={false} img={UpSide} />
                    <InstructionPhoto type={'SEC'} correct={false} img={Blury} /> */}
                </View>
                <View style={styles.wrongContainer}>
                    <View style={styles.imageView}>
                        <InstructionPhoto type={'SEC'} correct={false} img={SideWay} />
                        <Text style={styles.explainText}>Sideways</Text>
                    </View>
                    <View style={styles.imageView}>
                        <InstructionPhoto type={'SEC'} correct={false} img={Held} />
                        <Text style={styles.explainText}>Obstructions</Text>
                    </View>
                    <View style={styles.imageView}>
                        <InstructionPhoto type={'SEC'} correct={false} img={Angle} />
                        <Text style={styles.explainText}>angled</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate(Screens.cameraScreen)}>
                    <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default InstructionScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    innerContainer: {
        width: '100%',
        height: '100%',
        // backgroundColor: 'green'
    },
    correctContainer: {
        // backgroundColor: 'green',
        width: '100%',
        height: '30%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headingText: {
        marginTop: 5,
        fontFamily: 'Bicyclette-Bold',
        color: 'white',
        alignSelf: 'center',
        fontSize: 18,
    },
    wrongContainer: {
        // padding: 12,
        width: '100%',
        height: '25%',
        // backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    imageView: {
        width: 100,
        height: '80%',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden'
        
        // backgroundColor: 'green'
    },
    explainText: {
        fontSize: 16,
        fontFamily: 'Bicyclette-Bold',
        color: COLORS.white

    },
    continueButton: {
        backgroundColor: COLORS.primaryColor,
        width: '80%',
        height: '7%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        alignSelf: 'center',
    },
    continueText: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: '600',
        fontFamily: 'Bicyclette-Bold'
    }
})