import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'


const {width, height} = Dimensions.get('window')
const TopBorder = () => {
    return (
        <Svg width={width/1.5} height={height/20} viewBox="0 0 1024.14 96.18">
            <Path fill={'#0e3050'} class="cls-2" d="M998.74,92.1c-11.21,0-20.53-8.77-21.22-19.97-.17-2.72-1.18-12.12-7.21-19.11-5.11-5.91-10.86-6.37-12.5-6.37h-.54s-890.87,0-890.87,0c-2.18.03-7.67.7-12.57,6.37-6.03,6.98-7.04,16.39-7.21,19.11-.69,11.2-10.02,19.97-21.22,19.97-.44,0-.89-.01-1.34-.04-5.68-.35-10.88-2.89-14.64-7.15-3.76-4.26-5.64-9.73-5.29-15.41.6-9.68,3.67-28.31,17.49-44.31C38.07,6.13,58.44,4.08,66.43,4.08h891.1c10,0,29.13,2.74,45,21.12,13.82,16,16.89,34.63,17.49,44.31.35,5.68-1.53,11.15-5.29,15.41-3.77,4.26-8.96,6.8-14.64,7.15-.45.03-.9.04-1.34.04h0Z" />
            <Path fill={'#fff'} class="cls-1" d="M66.43,8.15c.17,0,.33,0,.48,0h.04s.04,0,.04,0h890.19s.34,0,.34,0c9.3,0,27.11,2.56,41.92,19.7,13.04,15.1,15.94,32.73,16.5,41.9.28,4.59-1.24,9.01-4.28,12.46-3.04,3.45-7.25,5.5-11.84,5.78-.36.02-.73.03-1.09.03-9.06,0-16.59-7.09-17.15-16.15-.24-3.9-1.52-13.79-8.2-21.52-6.24-7.22-13.5-7.78-15.58-7.78h-.15s-.39,0-.39,0H198.9s-.27,0-.27,0H66.4s-.05,0-.05,0h-.05c-2.69.03-9.58.86-15.56,7.78-6.67,7.72-7.95,17.62-8.2,21.52-.56,9.06-8.1,16.15-17.16,16.15-.36,0-.72-.01-1.09-.03-4.59-.28-8.79-2.34-11.84-5.78-3.04-3.45-4.56-7.87-4.28-12.46.57-9.17,3.47-26.8,16.5-41.89,15.36-17.79,34.31-19.71,41.74-19.71h0M66.43,0c-9.18,0-30.52,2.39-47.91,22.53C3.92,39.43.68,59.06.05,69.25c-.87,13.98,9.77,26.02,23.75,26.88.53.03,1.06.05,1.59.05,13.29,0,24.46-10.35,25.29-23.8.15-2.4,1.04-10.68,6.23-16.69,4.15-4.8,8.63-4.95,9.49-4.96h132.23s.04,0,.07,0h759.04s.05,0,.07,0c1.03,0,5.37.28,9.41,4.96,5.19,6.01,6.08,14.3,6.23,16.69.83,13.45,12,23.8,25.29,23.8h0c.53,0,1.06-.02,1.59-.05,13.98-.86,24.62-12.9,23.75-26.88-.63-10.19-3.87-29.81-18.47-46.72C988.11,2.26,966.63,0,957.53,0c-.13,0-.27,0-.39,0H67C66.82,0,66.62,0,66.43,0h0Z" />
        </Svg>
    )
}

export default TopBorder

const styles = StyleSheet.create({})