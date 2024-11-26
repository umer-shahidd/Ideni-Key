import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useRef } from 'react'
import WebView from 'react-native-webview'
import { useRoute } from '@react-navigation/native'


const WebViewScreen = () => {
    const route = useRoute();
    const webViewRef1 = useRef();
    const src = route.params
    return (
        <SafeAreaView style={{flex: 1}}>
            <WebView
                ref={webViewRef1}
                source={{ uri: src.source }}
                onContentProcessDidTerminate={() => webViewRef1.current.reload()}
            />
        </SafeAreaView>
    )
}

export default WebViewScreen

const styles = StyleSheet.create({})