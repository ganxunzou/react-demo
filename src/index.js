import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import PropTypes from 'prop-types';

class Hello extends Component {
  render() {
    return (
      <div>
        Hello{this.props.name}
        <App />
      </div>
    );
  }
}
Hello.propTypes = {
  name: PropTypes.string,
};

ReactDOM.render(<Hello name="ganxz" />, document.getElementById('app'));
