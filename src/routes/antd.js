// import { injectReducer } from 'REDUCER'
// import createContainer from 'UTIL/createContainer'

export default {
  path: '/antd',

  /* 布局基页 */
  getComponent(nextState, cb) {
    require.ensure(
      [],
      require => {
        cb(null, require('VIEW/antddemo').default);
      },
      'antddemo',
    );
  },
};

/**
 * 【拓展】
 * 在 msg 的路由中，Reducer 是在 布局基页 中注入
 * 而在这里就可以在 indexRoute 中注入
 * 这主要取决于 Reducer 的作用范围
 */
