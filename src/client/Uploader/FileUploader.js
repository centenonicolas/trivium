import React from 'react'
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
    }
    onFormSubmit(e) {
        e.preventDefault(); // Stop form submit

        if (!this.state.file) {
            window.alert('Debe cargar un archivo');
            return;
        }

        this.state.file.arrayBuffer()
            .then(arrayBuffer => {
                const encrypted = cipherBmp(Buffer.from(arrayBuffer), this.props.keyString, this.props.ivString)
                this.setState({
                    downloadDisable: false,
                    ciphered: new Blob([encrypted])
                });
            }).catch(err => {
                window.alert('La clave y el vector de inicialización deben tener 10 caracteres');
            })
    }

    onChange(e) {
        this.setState({ file: e.target.files[0] })
    }
    onClick(file, cipherData) {
        if (file !== null) {
            const link = document.createElement('a');
            const fileName = file.name.includes(".ciph") ? file.name.replace(".ciph", "") : file.name.concat(".ciph");
            link.href = window.URL.createObjectURL(cipherData);
            link.download = `${fileName}`;
            link.click();
            this.setState({
                downloadDisable: true
            });
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <h1>Archivo a encriptar</h1>
                    <input type="file" onChange={this.onChange} />
                    <button type="submit">Encriptar</button>
                </form>
                <button className='downloadButton' type="button" disabled={this.state.downloadDisable} onClick={() => this.onClick(this.state.file, this.state.ciphered)}> Descargar archivo </button>
            </div>
        )
    }
}

export default FileUploader
