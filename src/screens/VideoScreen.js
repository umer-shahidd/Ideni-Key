import { ImageBackground, StyleSheet, SafeAreaView } from 'react-native';
import React, { useRef } from 'react';
import BGImage from '../assets/images/bodyBg.jpg';
import YoutubePlayer from "react-native-youtube-iframe";
import { WebView } from 'react-native-webview';

const VideoScreen = () => {
    const videoref = useRef();
    const webViewRef = useRef();

    return (
        <SafeAreaView style={{flex: 1}}>
      {/* <YoutubePlayer
                ref={videoref}
                height={200} // Set a fixed height for the YouTube player
                width={"100%"}
                videoId={'Se-DS11oX_w'}
                onError={(e) => console.error('YouTube Player Error:', e)}
            /> */}
      <WebView
        ref={webViewRef}
        source={{uri: 'clksupplies.com/pages/how-to-use-idenikey'}}
        // onNavigationStateChange={newNavState => {
        //   if (newNavState.url.includes('calik.app/frontKey')) {
        //     setIdenikey(newNavState.url);
        //   }
        //   if (newNavState.url.includes('calik.app/resultKey')) {
        //     if (!isIdenikey.includes('calik.app/resultKey')) {
        //       setIdenikey(newNavState.url);
        //     }
        //   }
        //   if (
        //     newNavState.url.includes(
        //       'clksupplies.com/pages/how-to-use-idenikey',
        //     )
        //   ) {
        //     setIdenikey('https://calik.app/');
        //   }
        //   if (newNavState.url.includes('clksupplies')) {
        //     webViewRef.current.goBack();
        //     setclk(newNavState.url);
        //     navigation.navigate('CLK');
        //   }
        // }}
        onContentProcessDidTerminate={() => webViewRef.current.reload()}
        startInLoadingState={true}
        // renderLoading={() => (
        //   <ActivityIndicator
        //     style={{
        //       position: 'absolute',
        //       top: 0,
        //       right: 0,
        //       bottom: 0,
        //       left: 0,
        //     }}
        //     size="large"
        //     color="#176FCE"
        //   />
        // )}
      />
   
    </SafeAreaView>





        // <ImageBackground source={BGImage} resizeMode='repeat' style={styles.container}>
            // <YoutubePlayer
            //     ref={videoref}
            //     height={200} // Set a fixed height for the YouTube player
            //     width={"100%"}
            //     videoId={'Se-DS11oX_w'}
            //     onError={(e) => console.error('YouTube Player Error:', e)}
            // />
        //     {/* <WebView 
        //         ref={webViewRef} 
        //         source={{ uri: 'https://clksupplies.com/pages/how-to-use-idenikey'}} 
        //         style={styles.webView} 
        //         onContentProcessDidTerminate={() => webViewRef.current.reload()}
        //         startInLoadingState={true}
        //     /> */}
              
        // </ImageBackground>
    );
}

export default VideoScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    webView: {
        position: "absolute",
        width: '100%',
        flex: 1, 
    },
});
