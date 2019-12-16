import React, { Component } from 'react';
import { Animated, Easing, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
// import AnimatedValueXY = Animated.AnimatedValueXY;
import ValueXY = Animated.ValueXY;

interface ScrollVerticalProps {
  scrollHeight: number;
  delay: number;
  duration: number;
  kbContainer: ViewStyle;
  scrollStyle: ViewStyle;
  textStyle: TextStyle;
  enableAnimation: boolean;
  data: Array<{ content: string }>;
  onChange: Function;
}

interface ScrollVerticalState {
  enableAnimation: boolean;
  // translateValue: AnimatedValueXY;
  translateValue: ValueXY;
  // 滚屏高度
  scrollHeight: number;
  // 滚屏内容
  kb_content: Array<{ content: string }>;
  // Animated.View 滚动到的 y轴坐标
  kb_tempValue: number;
  // 最大偏移量
  kb_contentOffsetY: number;
  // 每一次滚动切换之前延迟的时间
  delay: number;
  // 每一次滚动切换的持续时间
  duration: number;
}

export default class ScrollVertical extends Component<ScrollVerticalProps, ScrollVerticalState> {
  static defaultProps = {
    enableAnimation: true,
  };
  private animation: number = -1;

  constructor(props: any) {
    super(props);
    let translateValue = new Animated.ValueXY({ x: 0, y: 0 });
    // translateValue.addListener(({ x, y }) => {
    // Log('value',x,y)
    // });
    this.state = {
      translateValue: translateValue,
      // 滚屏高度
      scrollHeight: this.props.scrollHeight || 32,
      // 滚屏内容
      kb_content: [],
      // Animated.View 滚动到的 y轴坐标
      kb_tempValue: 0,
      // 最大偏移量
      kb_contentOffsetY: 0,
      // 每一次滚动切换之前延迟的时间
      delay: this.props.delay || 500,
      // 每一次滚动切换的持续时间
      duration: this.props.duration || 500,
      enableAnimation: true,
    };
  }

  render() {
    return (
      <View style={[styles.kbContainer, { height: this.state.scrollHeight }, this.props.kbContainer]}>
        {this.state.kb_content.length !== 0 ? (
          <Animated.View
            style={[
              { flexDirection: 'column' },
              {
                transform: [{ translateY: this.state.translateValue.y }],
              },
            ]}>
            {this.state.kb_content.map(this._createKbItem.bind(this))}
          </Animated.View>
        ) : null}
      </View>
    );
  }

  componentWillReceiveProps(nextProps: ScrollVerticalProps) {
    // console.log('componentWillReceiveProps', nextProps)
    this.setState({ enableAnimation: nextProps.enableAnimation }, () => this.startAnimation());
  }

  componentDidMount() {
    // console.log('componentDidMount')
    let content = this.props.data || [];
    if (content.length !== 0) {
      let h = (content.length + 1) * this.state.scrollHeight;
      this.setState({
        kb_content: content.concat(content[0]),
        kb_contentOffsetY: h,
      });

      // 开始动画
      // this._startAnimation()
      this.startAnimation();
    }
  }

  _createKbItem(kbItem: { content: string }, index: number) {
    return (
      <View key={index} style={[{ justifyContent: 'center', height: this.state.scrollHeight }, this.props.scrollStyle]}>
        <Text style={[styles.kb_text_c, this.props.textStyle]}>{kbItem.content}</Text>
      </View>
    );
  }

  startAnimation = () => {
    if (this.state.enableAnimation) {
      if (!this.animation) {
        this.animation = setTimeout(() => {
          this.animation = -1;
          this._startAnimation();
        }, this.state.delay);
      }
    }
  };

  componentWillUnmount() {
    if (this.animation) {
      clearTimeout(this.animation);
    }
    if (this.state.translateValue) {
      // this.state.translateValue.removeAllListeners();
      try {
        this.state.translateValue.x.removeAllListeners();
        this.state.translateValue.y.removeAllListeners();
      } catch (e) {}
    }
  }

  _startAnimation = () => {
    // this.state.kb_tempValue -= this.state.scrollHeight;
    this.setState(oldState => ({ kb_tempValue: oldState.kb_tempValue - oldState.scrollHeight }));
    if (this.props.onChange) {
      let index = Math.abs(this.state.kb_tempValue) / this.state.scrollHeight;
      this.props.onChange(index < this.state.kb_content.length - 1 ? index : 0);
    }
    Animated.sequence([
      // Animated.delay(this.state.delay),
      Animated.timing(this.state.translateValue, {
        isInteraction: false,
        toValue: { x: 0, y: this.state.kb_tempValue },
        duration: this.state.duration, // 动画持续的时间（单位是毫秒），默认为500
        easing: Easing.linear,
      }),
    ]).start(() => {
      // 无缝切换
      // Log('end')
      if (this.state.kb_tempValue - this.state.scrollHeight === -this.state.kb_contentOffsetY) {
        // 快速拉回到初始状态
        this.state.translateValue.setValue({ x: 0, y: 0 });
        // this.state.kb_tempValue = 0;
        this.setState({ kb_tempValue: 0 });
      }
      this.startAnimation();
    });
  };
}

const styles = StyleSheet.create({
  kbContainer: {
    // 必须要有一个背景或者一个border，否则本身高度将不起作用
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  kb_text_c: {
    fontSize: 18,
    color: '#181818',
  },
});
