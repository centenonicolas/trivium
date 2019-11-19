import React, { Component } from 'react';
import trivium from './trivium.svg';
import './App.css';
import FileUploader from "./Uploader/FileUploader";
import axios from "axios";


class App extends Component {

    constructor(props) {
        super(props);
        this.state ={
            key:""
        };
        this.onChange = this.onChange.bind(this)
    }
    fileUpload(file, key){
        //todo meter url del back
        const url = 'http://localhost:8080/encrypt';
        const formData = new FormData();
        formData.append('file',file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        };
        return  axios.post(url, formData, config).then(res => {
            console.log(res.statusText);
            debugger;
        }, (error) => {
            console.log(error)
        });
    }

    onChange(event){
        this.setState({key:event.target.value})
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
              <span className="icon"/>
              <span className="label-margin">
                  Ingrese la llave del mensaje
              </span>
              <input className="label-margin" type="text" name="keyValue" onChange={e=> this.onChange(e)}/>
          </div>
        {/*<p className="App-intro">*/}
        {/*  To get started, edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}
        <FileUploader keyString={this.state.key}/>
      </div>
    );
  }
}

export default App;
