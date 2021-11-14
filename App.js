/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {FlatList, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';


import {WebView} from 'react-native-webview';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};
const App = () => {
    const [netInfo, setNetInfo] = React.useState('');

    //check interconnectionis connect
    React.useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {

            setNetInfo(state.isInternetReachable);
        });
        return () => {
            // Unsubscribe to network state updates
            unsubscribe();
        };

    }, []);

    const [refreshing, setRefreshing] = React.useState(false);
    const webviewref = React.useRef();

    const onRefresh = () => {


        console.log('top of the page');
        webviewref.current.reload();
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));


    };

    const handleScroll = (event) => {
        const yOffset = Number(event.nativeEvent.contentOffset.y);
        if (yOffset === 0) {
            onRefresh();


        } else {
        }
    };

    const returncombyinternet = () => {

        NetInfo.fetch().then(state => {
            setNetInfo(state.isInternetReachable);
        });
        if (netInfo) {
            return (


                <WebView
                    scalesPageToFit
                    startInLoadingState
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    setSupportMultipleWindows={false}
                    originWhitelist={['*']}
                    ref={webviewref}
                    // onScroll={handleScroll}

                    source={{
                        uri: 'http://yankeemusic.rf.gd',
                    }}
                />
            );

        } else {
            return (

                <Text style={{marginTop:50,fontSize:22,fontWeight:'bold',marginLeft:50}}>Internet Connection time out
                </Text>

            );

        }


    };


    return (
        <View style={{flex: 1}}>
            {returncombyinternet()}
        </View>


    );


};

export default App;
