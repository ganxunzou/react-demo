import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'COMPONENT/Navbar';

// let DevTools
// if (__DEV__ && __COMPONENT_DEVTOOLS__) {
//   // 组件形式的 Redux DevTools
//   DevTools = require('COMPONENT/DevTools').default
// }

const App = ({ children, location }) => (
  <div>
    <Navbar location={location} />

    <div className="container">
      {/* 相当于 Vue Demo 中的根 router-view */}
      {children}
    </div>

    {/* { DevTools && <DevTools /> } */}
  </div>
);

App.propTypes = {
  name: PropTypes.string,
};
export default App;
