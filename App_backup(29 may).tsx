
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useRef } from 'react';
import {ActivityIndicator,Text, View, SafeAreaView,StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function App() {
    const webViewRef = useRef()
    const [isLoading, setLoading] = useState(false);
    var isdata = 0;



    /*  const handleWebViewNavigationStateChange = newNavState => {
      if(newNavState.url.includes('calik.app/resultKey')){
        //console.log(newNavState.url);
          setIdenikey(newNavState.url);
      }
        if(newNavState.url.includes('clksupplies')){
          console.log(isdata);
          setclk(newNavState.url);
            isdata = 1;
            navigation.navigate('CLK');
        }
      };

       function webViewgoback() {
          if (webViewRef.current) webViewRef.current.goBack();
        }

        function webViewNext() {
          if (webViewRef.current) webViewRef.current.goForward();
        } */

    function CalikScreen() {
      return (
        <SafeAreaView style={{flex: 1}}>
           <WebView
               ref={webViewRef}
               source={{ uri: 'https://calik.app/' }}
               onNavigationStateChange={handleWebViewNavigationStateChange}
               onContentProcessDidTerminate={() => webViewRef.current.reload()}
               startInLoadingState={true}
               renderLoading={() => <ActivityIndicator
                       style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
                       size="large" color="#176FCE" />
               }
           />
        </SafeAreaView>
      );
    }

    function ClkScreen() {
      return (
        <SafeAreaView style={{flex: 1}}>
          <WebView
            source={{uri: 'https://www.clksupplies.com/'}}
            startInLoadingState={true}
            renderLoading={() => <ActivityIndicator
                   style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
                   size="large" color="#176FCE" />
            }
         />
        </SafeAreaView>
      );
    }

    const Tab = createBottomTabNavigator();

    function MyTabs() {
      return (
        <Tab.Navigator
            screenOptions={{
               headerShown:false,
               tabBarShowLabel : false,
               tabBarActiveBackgroundColor:'#CCD5DB',
               tabBarInactiveBackgroundColor:'#0E3050',
               tabBarStyle: {
                backgroundColor:'#071828',
                borderTopWidth: 0,
                borderTopColor: '#000000',
                ...style.shadowProp
               },
               tabBarItemStyle:{
                     margin:5,
                     borderRadius:10,
                   }
            }}
        >
          <Tab.Screen name="Calik" component={CalikScreen}
           listeners={({ navigation, route }) => ({
                          tabPress: e => {
               if(isdata==1)  {
                const run = `document.getElementsByClassName('gLFyf')[0].value = 'World';`;
                                   try {
                                     isdata=0;
                                     const newURL = "https://calik.app/";
                                   const redirectTo = 'window.location = "' + newURL + '"';
                                    webViewRef.current?.injectJavaScript(redirectTo);
                                   } catch (err) {
                                       console.log("[handletabButtonPress] Error : ", err.message)
                                   }
                            }
                          },
                      })}



           options={{
            tabBarIcon:({focused}) => (
               <View
                  style={{
                     alignItems:'center',
                     justifyContent:'center',
                  }}>
                  <Text style={{color:focused ? '#071828' : '#ffffff', ...style.menuDesign }}>ideniKey</Text>
               </View>
            ),
        }}  />
          <Tab.Screen name="CLK" component={ClkScreen}
           options={{
                  tabBarIcon:({focused}) => (
                     <View
                     style={{
                        alignItems:'center',
                        justifyContent:'center',
                     }}>
                      <Text style={{color:focused ? '#071828' : '#ffffff', ...style.menuDesign}}>CLK</Text>
                     </View>
                  ),
              }}  />
        </Tab.Navigator>
      );
    }

    return (
      <>
            <NavigationContainer>
                  <MyTabs />
            </NavigationContainer>
          </>
      );
  }
const style = StyleSheet.create({
  menuDesign:{
    fontWeight:'bold',
    fontSize:20,
  },
  shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
});
