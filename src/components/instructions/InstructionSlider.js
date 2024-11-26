import { StyleSheet, Text, View, Dimensions, ImageBackground, Image } from 'react-native'
import React from 'react'
import BGImage from '../../assets/images/bodyBg.jpg'
import Instructions from '../../assets/images/instruction.png'
import InstructionPhoto from './InstructionPhoto'

const { height, width } = Dimensions.get('window')

const InstructionSlider = () => {
  return (
    <View source={BGImage} resizeMode='repeat' style={styles.container}>
      {/* <Image source={Instructions} resizeMode='contain' style={styles.imageMain} /> */}
      <View style={styles.correctContainer}>
        <Text style={styles.headingText}>Photo example:</Text>
        <InstructionPhoto />
      </View>

    </View>
  )
}

export default InstructionSlider

const styles = StyleSheet.create({
  container: {
    width: width ,
    height: height ,
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
    // marginTop: '20%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0.8)'
  },
  imageMain: {
    width: '90%',
    // backgroundColor: 'blue',
    height: '80%',
  },
  correctContainer: {
    // backgroundColor: 'green',
    height: '22%',
    width: '80%',
    alignSelf: 'center',

    alignItems: 'center'
  },
  headingText: {
    fontFamily: 'Bicyclette-Bold',
    color: 'white',
    // alignSelf: 'center',
    fontSize: 18,
  }
})