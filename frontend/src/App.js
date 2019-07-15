import React, { Component } from 'react';
import './App.css';
import FormUpload from './components/FormUpload';
import socketIOClient from 'socket.io-client';

class App extends Component {
  
  state = {
    files: [],
    endpoint: "http://localhost:4001"
  }

  componentDidMount = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.on('reloadFilesList', (data) => {
        this.setState({files: data})
    })
  }

  componentWillMount(){
    fetch('http://localhost:8000/files', {
    method: 'POST',
    }).then((response,error) => {
      response.json().then((body) => {
        this.setState({files: body.files});
      }).catch(err => {
        console.log('caught it!',err);
      });
    });
  }

  render() {
    const files = this.state.files.map(file => <p>{file}</p>);

    return (
      <div className="App">
        <FormUpload />
        <div className="filesList">
          <h2>Upload files successfully</h2>
          {files}
        </div>
      </div>
    );
  }
}

export default App;