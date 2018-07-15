import React, { Component } from 'react';

class TextField extends Component {
  render() {   
    return <input className="pt-input" type="text" dir="auto" {...this.props} />;
  }
}

export default TextField;