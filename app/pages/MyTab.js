/**
 * Create by chengkai on 2019/9/26.
 * Describe:
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default class MyTab extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>MyTab</Text>
            </View>
        )
    }
}
