import React, { Component } from 'react';
import { ActivityIndicator } from '@ant-design/react-native';
import fetch from 'sx-fetch';

import Storage from '../utils/storage';
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import Global from "../utils/Global";
import { NavigationActions, StackActions } from "react-navigation";
import { px } from "../utils/ScreenUtil";
import { platformSelect } from "../utils/PlatformTool";

export default class LaunchScreen extends Component {
    static navigationOptions = {
        header: null
    }

    componentWillMount() {
        /* 判断是否存在 token */
        Storage.load({
            key: 'loginData',
        }).then(res => {
            if (res['loginStatus']) {
                fetch.axiosInstance.defaults.headers['GASAPP_TOKEN'] = res['GASAPP_TOKEN'];
                Global.loginInfo = res;
            }
            this.goToTabPage();
        }).catch(this.goToTabPage);

    }

    /**
     * 跳转到首页
     * @return {void}
     */
    goToTabPage = () => {
        this.props.navigation.dispatch(StackActions.reset({
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'MainTab' })],
            index: 0
        }));
    }

    getContentView = () => platformSelect({
        android: (
            <View style={styles.androidContainerStyle}>
                <StatusBar
                    animated={false}
                    backgroundColor='transparent'
                    translucent={true}
                    barStyle="dark-content"/>
                <ActivityIndicator animating={true}/>
            </View>
        ),
        ios: (
            <View style={styles.iosContainerStyle}>
                <StatusBar
                    animated={false}
                    backgroundColor='transparent'
                    translucent={true}
                    barStyle="dark-content"/>
                <Image
                    style={styles.imgStyle}
                    source={require('../assets/images/welcome/start_screen_icon.png')}/>
                <Text style={styles.textStyle}>小随加油</Text>
                <View style={styles.indicatorStyle}>
                    <ActivityIndicator animating={true}/>
                </View>
            </View>
        )
    })

    render() {
        return this.getContentView();
    }
}

const styles = StyleSheet.create({
    androidContainerStyle: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iosContainerStyle: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    imgStyle: {
        width: px(650),
        height: px(372),
        marginTop: px(364)
    },
    textStyle: {
        fontSize: px(40),
        fontFamily: 'PingFangSC-Medium',
        fontWeight: '500',
        color: 'rgba(92,92,92,1)',
        lineHeight: px(56),
        letterSpacing: 1.3,
        marginTop: px(352)
    },
    indicatorStyle: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
