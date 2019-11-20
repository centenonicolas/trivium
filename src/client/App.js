import React, { Component } from 'react';
import trivium from './trivium.svg';
import './App.css';
import FileUploader from "./Uploader/FileUploader";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: "",
      iv: ""
    };
    this.onChange = this.onKeyChange.bind(this)
  }

  onKeyChange(event) {
    this.setState({ ...this.state, key: event.target.value })
  }

  onIvChange(event) {
    this.setState({ ...this.state, iv: event.target.value })
  }

  render() {
    console.log("hola");
    return (
      <div className="App">
        <div className="App-header">
          <img src={trivium} className="App-logo" alt="trivium" />
          <h2>Welcome to Trivium encoder / decoder</h2>
        </div>
        <div>
          <span className="icon" />
          <span className="label-margin">
            Ingrese la clave e IV del mensaje
              </span>
          <input className="label-margin" type="text" placeholder="Clave (10)" name="keyValue" onChange={e => this.onKeyChange(e)} />
          <input className="label-margin" type="text" placeholder="Vector de inicialización (10)" name="ivValue" onChange={e => this.onIvChange(e)} />
        </div>
        {/*<p className="App-intro">*/}
        {/*  To get started, edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}
        <FileUploader keyString={this.state.key} ivString={this.state.iv} />
      </div>
    );
  }
}

export default App;
