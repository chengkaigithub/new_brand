/**
 * Create by chengkai on 2019/9/26.
 * Describe:
 */

import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default class OtherPageOne extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerLeft: (
                <Button onPress={() => navigation.goBack()} title="返回" color="#f00"/>
            ),
            /* the rest of this config is unchanged */
        };
    };
    render() {
        return (
            <View style={styles.container}>
                <Text>OtherPageOne</Text>
            </View>
        )
    }
}
