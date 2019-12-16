import React from 'react';
import { Image, ImageBackground, ImageProps, Platform, StyleSheet } from 'react-native';

/**
 * 图片组件，解决android无默认图片问题；
 */
export default (props: ImageProps): JSX.Element => {
  if (Platform.OS === 'android' || props.defaultSource) {
    return (
      // @ts-ignore
      <ImageBackground style={props.style} source={props.defaultSource}>
        <Image {...props} style={[props.style, styles.fixStyle]} />
      </ImageBackground>
    );
  }
  return <Image {...props} />;
};

const styles = StyleSheet.create({
  fixStyle: {
    marginLeft: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
});
