import React, { Component } from 'react';
import logo from './logo.svg';
import trivium from './trivium.svg';
import './App.css';
import SimpleReactFileUpload from "./FileUploader";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={trivium} className="App-logo" alt="trivium" />
          <h2>Welcome to Trivium encoder / decoder</h2>
        </div>
        {/*<p className="App-intro">*/}
        {/*  To get started, edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}
        <textarea/>
        <SimpleReactFileUpload></SimpleReactFileUpload>
      </div>
    );
  }
}

export default App;
