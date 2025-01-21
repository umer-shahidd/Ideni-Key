import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import WelcomScreen from '../screens/WelcomScreen';
import { Screen } from 'react-native-screens';
import { Screens } from './Screens';
import TakePictureScreen from '../screens/TakePictureScreen';
import VideoScreen from '../screens/VideoScreen';
import CameraScreen from '../screens/CameraScreen';
import TakeSecondImage from '../screens/TakeSecondImage';
import KeyResult from '../screens/KeyResult';
import WebViewScreen from '../components/webview/WebView';
import FeedBackScreen from '../screens/FeedBackScreen';
import ViewImagesScreen from '../screens/ViewImagesScreen';

const Stack = createStackNavigator();

const TakePhotoFlow = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen component={WelcomScreen} name={Screens.welcomScreen}  options={{headerShown: false}}/>
        <Stack.Screen component={TakePictureScreen} name={Screens.takePhotScreen}  options={{headerShown: false}}/>
        <Stack.Screen component={VideoScreen} name={Screens.videoScreen}  options={{headerShown: false}}/>
        <Stack.Screen component={TakeSecondImage} name={Screens.TakesecondPhoto} options={{headerShown: false}} />
        <Stack.Screen component={KeyResult} name={Screens.KeyResult} options={{headerShown: false}}/>
         <Stack.Screen component={WebViewScreen} name={Screens.WebView} options={{headerTitle: 'Buy Key', headerBackTitleVisible: false}} />
         <Stack.Screen component={FeedBackScreen} name={Screens.FeedBackScreen} options={{headerShown: false}}  />
         <Stack.Screen component={ViewImagesScreen} name={Screens.viewImagesScreen} options={{headerShown: false}}  />
        {/* <Stack.Screen component={CameraScreen} name={Screens.cameraScreen}  options={{headerShown: false}}/> */}

    </Stack.Navigator>
  )
}

export default TakePhotoFlow

const styles = StyleSheet.create({})