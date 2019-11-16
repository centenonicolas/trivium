import React from 'react'
import axios, { post } from 'axios';

class FileUploader extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file:null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    onFormSubmit(e){
        //e.preventDefault(); // Stop form submit
        this.fileUpload(this.state.file).then((response)=>{
            console.log(response.data);
        });
        e.preventDefault();
    }
    onChange(e) {
        this.setState({file:e.target.files[0]})
    }
    fileUpload(file){
        //todo meter url del back
        // const url = 'http://example.com/file-upload';
        const url = '/encrypt';
        const formData = new FormData();
        formData.append('file',file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return  axios.post(url, formData).then(res => {
            console.log(res.statusText);
            debugger;
        }, (error) => {
            console.log(error)
        });
        //todo va a tener un map con lo que quiera hacer con lo que devuelva el back (el file encriptado)
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" onChange={this.onChange} />
                <button type="submit">encrypt</button>
            </form>
        )
    }
}



export default FileUploader
