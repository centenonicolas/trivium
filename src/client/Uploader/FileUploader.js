import React from 'react'
import axios from 'axios';
import './FileUploader.css';
import { cipherBmp } from '../Trivium/cipher';
const Buffer = require('buffer/').Buffer;

class FileUploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            downloadDisable: true,
            ciphered: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    async onFormSubmit(e) {
        e.preventDefault(); // Stop form submit

        const arrayBuffer = await this.state.file.arrayBuffer();
        debugger
        const encrypted = cipherBmp(Buffer.from(arrayBuffer), '1234567890', '1234567890');

        console.log();
        this.setState({
            downloadDisable: false,
            ciphered: new Blob([encrypted])
        })
        // e.preventDefault();
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] })
    }
    onClick(file, cipherData) {
        if (file !== null) {
            const reader = new FileReader();
            reader.readAsDataURL(cipherData);
            const link = document.createElement('a');
            const fileName = file.name.includes(".ciph") ? file.name.replace(".ciph", "") : file.name.concat(".ciph");
            link.href=window.URL.createObjectURL(blob);
            link.download=`${fileName}`;
            link.click();
        }
    }
    fileUpload(file) {
        const url = 'http://localhost:8080/encrypt';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('key', this.props.keyString);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        };
        return axios.post(url, formData, config).then(res => {
            console.log(res.statusText);
            return res;
        }, (error) => {
            console.log(error)
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <h1>File to encrypt</h1>
                    <input type="file" onChange={this.onChange} />
                    <button type="submit">encrypt</button>
                </form>
                <button className='downloadButton' type="button" disabled={this.state.downloadDisable} onClick={() => this.onClick(this.state.file, this.state.ciphered)}> download Ciphered file </button>
            </div>
        )
    }
}

export default FileUploader
