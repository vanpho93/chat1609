import React, { Component } from 'react';
import { socket } from './socketClient';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      users: [],
      isLoggedIn: false
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
    const { users, isLoggedIn, messages } = this.state;
    if (isLoggedIn) return (
      <div style={{ padding: '10px', display: 'flex', flexDirection: 'row' }}>
        <div>
          <input placeholder="Message" ref="txtMessage" />
          <br /><br />
          <button onClick={this.onSendMessage.bind(this)}>
            Send
          </button>
          <h4>Messages</h4>
          { messages.map((e, index) => <p key={index}>{e}</p>) }
        </div>
        <div style={{ padding: '10px', marginTop: 50 }}>
            <h4>User Online</h4>
            { users.map((e, index) => <p key={index}>{e}</p>) }
        </div>
      </div>
    );
    return (
      <div style={{ padding: '10px' }}>
        <input placeholder="Username" ref="txUsername" />
        <br /><br />
        <button onClick={this.onSendMessage.bind(this)}>
          Sign In
        </button>
      </div>
    )
  }
}

export default App;
