import React, { useState, useRef, useEffect } from 'react';
import { ActivityIndicator, Text, View, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WelcomScreen from './src/screens/WelcomScreen';
import TakePhotoFlow from './src/navigations/TakePhotoFlow';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from './src/screens/CameraScreen';
import { Screens } from './src/navigations/Screens';
import DummyViewScreen from './src/screens/DummyViewScreen';
import InstructionScreen from './src/screens/InstructionScreen';
import WebViewScreen from './src/components/webview/WebView';

const Stack = createStackNavigator();

const Dropdown = ({ visible, onClose, onSelectOption }) => {
  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.dropdownContainer}>
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              onSelectOption(
                'https://clksupplies.com/pages/how-to-use-idenikey',
              );
            }}>
            <Text style={styles.modalButtonText}>HOW IT WORKS</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
              style={styles.modalButtonDanger}
              onPress={() => {
                Linking.openURL(
                  'https://play.google.com/store/account/subscriptions?package=com.idenikey&sku=com.idenikey.subscription',
                );
              }}>
              <Text style={styles.modalButtonText}>UNSUBSCRIBE</Text>
            </TouchableOpacity> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const CalikScreen = ({ navigation, isIdenikey, setIdenikey, setclk }) => {
  const webViewRef = useRef();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSelectOption = url => {
    setIdenikey(url);
    setDropdownVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <TouchableOpacity style={styles.helpButton} onPress={toggleDropdown}>
            <MaterialIcons name="more-vert" size={24} color="white" />
        </TouchableOpacity> */}
      <WebView
        ref={webViewRef}
        source={{ uri: isIdenikey }}
        onNavigationStateChange={newNavState => {
          if (newNavState.url.includes('calik.app/frontKey')) {
            setIdenikey(newNavState.url);
          }
          if (newNavState.url.includes('calik.app/resultKey')) {
            if (!isIdenikey.includes('calik.app/resultKey')) {
              setIdenikey(newNavState.url);
            }
          }
          if (
            newNavState.url.includes(
              'clksupplies.com/pages/how-to-use-idenikey',
            )
          ) {
            setIdenikey('https://calik.app/');
          }
          if (newNavState.url.includes('clksupplies')) {
            webViewRef.current.goBack();
            setclk(newNavState.url);
            navigation.navigate('CLK');
          }
        }}
        onContentProcessDidTerminate={() => webViewRef.current.reload()}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
            size="large"
            color="#176FCE"
          />
        )}
      />
      <Dropdown
        visible={dropdownVisible}
        onClose={toggleDropdown}
        onSelectOption={handleSelectOption}
      />
    </SafeAreaView>
  );
};

const ClkScreen = ({ isclk }) => {
  const webViewRef1 = useRef();
  const route = useRoute();
  const params= route.params;

  useEffect( () => {
    console.log('Params:', params?.source)
  }, [])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        ref={webViewRef1}
        source={{ uri: params ? params?.source : isclk}}
        onContentProcessDidTerminate={() => webViewRef1.current.reload()}
      />
    </SafeAreaView>
  );
};

export default function App() {

  const [isclk, setclk] = useState('https://www.clksupplies.com/');
  const [isIdenikey, setIdenikey] = useState('https://calik.app/');

  const Tab = createBottomTabNavigator();

  function MyTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: '#CCD5DB',
          tabBarInactiveBackgroundColor: '#0E3050',
          tabBarStyle: {
            backgroundColor: '#071828',
            borderTopWidth: 0,
            borderTopColor: '#000000',
            shadowColor: '#171717',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          },
          tabBarItemStyle: {
            margin: 5,
            borderRadius: 10,
          }
        }}
      >
        <Tab.Screen
          name="Calik"
          component={TakePhotoFlow}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ color: focused ? '#071828' : '#ffffff', ...styles.menuDesign }}>ideniKey</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="CLK"
          children={() => <ClkScreen  isclk={isclk}/>}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ color: focused ? '#071828' : '#ffffff', ...styles.menuDesign }}>CLK</Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={MyTabs} name='TabNavigation' />
        <Stack.Screen component={CameraScreen} name={Screens.cameraScreen} />
        <Stack.Screen component={DummyViewScreen} name={Screens.dummyScreen} />
        <Stack.Screen component={InstructionScreen} name={Screens.instructionScreen} />
        {/* <Stack.Screen component={WebViewScreen} name={Screens.WebView} /> */}

      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menuDesign: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  helpButton: {
    position: 'absolute',
    top: 20,
    right: 15,
    zIndex: 10,
    backgroundColor: '#002E50',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  dropdown: {
    backgroundColor: '#002E50',
    borderRadius: 20,
    padding: 5 * 8,
    width: '80%',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white'
  },
  modalButton: {
    backgroundColor: '#000000',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: '100%',
    minWidth: 175,
    alignItems: 'center',
  },
  modalButtonDanger: {
    backgroundColor: '#d80606',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: '100%',
    minWidth: 175,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
  },
  closeButton: {
    position: 'absolute',
    top: -15,
    right: -15,
    zIndex: 10,
    backgroundColor: '#000000',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#002E50',
    borderWidth: 4,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
