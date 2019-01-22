import React, { Component } from 'react';
import { hot } from "react-hot-loader";
import AuthRootSwitcher from "./AuthRootSwitcher";


class Root extends Component {
  render() {
    return <AuthRootSwitcher />
  }
}

export default hot(module)(Root);
