import React, { Component } from 'react';
import { Button, Input } from 'antd';
export default class AntdDemo extends Component {
  render() {
    return (
      <div>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="danger">Danger</Button>
        <Input placeholder="Basic usage" />
      </div>
    );
  }
}
