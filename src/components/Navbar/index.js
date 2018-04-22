import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { IndexLink, Link } from 'react-router'
// import { DH_UNABLE_TO_CHECK_GENERATOR } from 'constants';
// import LoginForm from './LoginForm'
// import LogoutDropdown from './LogoutDropdown'

/* 导航栏全局显示，控制着用户的登录注销 */

// @connect( // 功能同 UTIL/createContainer
//   ({ userData }) => ({ userData }),
//   require('ACTION/user').default
// )
export default class Navbar extends Component {
  componentWillMount() {
    console.info('[Navbar] 初始化：检查用户是否已经登录');
    console.info('[TIPS] 由于有Redux Logger，故之后就不手动打印动作了');
    // this.props.checkLogin();
  }

  render() {
    // let {
    //   userData,
    //   login,
    //   logout, // 通过 connect 获取
    //   location: { pathname }, // 通过 App 传入
    // } = this.props;
    // console.log(userData, login, logout, DH_UNABLE_TO_CHECK_GENERATOR);
    return <div className="row clearfix">NAV</div>;
  }
}

Navbar.protoTypes = {
  name: PropTypes.string,
};
