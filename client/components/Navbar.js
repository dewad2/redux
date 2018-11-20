import React, { Component } from 'react';
import NewNameEntry from './NewNameEntry';

export default class Navbar extends Component {
  render() {
    return (
      <nav>
        <h3># channelname goes here</h3>
        <NewNameEntry />
      </nav>
    );
  }
}
