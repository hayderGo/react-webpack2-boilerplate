import React from 'react';

export default class Bundle extends React.Component {
  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null
  };
  
  componentWillMount() {
    // 加载初始状态
    this.load(this.props);
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }
  
  load(props) {
    // 重置状态
    this.setState({
      mod: null
    });
    // 传入组件的组件
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      });
    });
  }
  
  render() {
    // if state mode not undefined,The container will render children
    // return this.props.children(this.state.mod);
    // 重点！
    return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}