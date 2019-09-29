/**
 * Create by chengkai on 2019/9/28.
 * Describe:
 */
import React, { Component, Fragment } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

function toastInject() {
  const that = this;
  return function(WrappedComponent) {
    class WithSubscription extends Component {
      static displayName = `ToastWithSubscription(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

      constructor(props) {
        super(props);
      }

      componentWillUnmount() {
        // 关闭toast
      }

      render() {
        const injectProps = {
          // 获取 toast 引用的方法, 防止初始化拿到的引用为undefined
        };
        return (
          <Fragment>
            <WrappedComponent {...injectProps} {...this.props} />
            {/* toast组件 */}
          </Fragment>
        );
      }
    }

    /* 将原组件的所有非react属性绑定新组件中 */
    hoistNonReactStatic(WithSubscription, WrappedComponent);

    return WithSubscription;
  };
}

export default fetchInject;
