import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React , {useState} from 'react'
import { COLORS } from '../../assets/style/Color'
import Icon from 'react-native-vector-icons/Feather'

const ZoomButton = ({returnValue}) => {
    const [value, setValue] = useState(0)


    const onPressMinus = () => {
        if (value > 0) {
            setValue(value - 0.1)
            returnValue(value - 0.1)
        }

    }

    const onPressPlus = () => {
        if (value < 1) {
            returnValue(value + 0.1);
            setValue(value + 0.1)
        }
    }



  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.zoomButton} onPress={onPressPlus}>
            <Icon size={20} color={'white'} name='zoom-in' />
        </TouchableOpacity>
        <View style={styles.seperator}></View>
        <TouchableOpacity style={styles.zoomButton2}  onPress={onPressMinus}>
            <Icon size={20} color={'white'} name='zoom-out' />
        </TouchableOpacity>
    </View>
  )
}

export default ZoomButton

const styles = StyleSheet.create({
    container: {
        backgroundColor : COLORS.primaryColor,
        width: '8%',
        height: '18%',
        borderRadius: 200,
        // justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'absolute',
        right: '3%',
        top: '40%',
        zIndex: 1,
    },
    seperator: {
        borderWidth: 0.5,
        borderColor: 'white',
        width: '100%'
    },
    zoomButton: {
        // borderBottomColor: COLORS.white,
        // borderBottomWidth: 1,
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'

    },
    zoomButton2: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'

    }
})