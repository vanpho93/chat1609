import React, { Component } from 'react';
import { socket } from './socketClient';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }
  componentDidMount() {
    socket.on('SERVER_SEND_MESSAGE', message => {
      this.setState(prevState => ({ messages: prevState.messages.concat(message) }));
    });
  }
  onSendMessage() {
    const message = this.refs.txtMessage.value;
    this.refs.txtMessage.value = '';
    socket.emit('CLIENT_SEND_MESSAGE', message);
  }
  render() {
    return (
      <div style={{ padding: '10px' }}>
        <input placeholder="Message" ref="txtMessage" />
        <br /><br />
        <button onClick={this.onSendMessage.bind(this)}>
          Send
        </button>
        { this.state.messages.map((e, index) => <p key={index}>{e}</p>) }
      </div>
    );
  }
}

export default App;
