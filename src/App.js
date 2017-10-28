import React, { Component } from 'react';
import { socket } from './socketClient';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      users: [],
      isLoggedIn: false,
      activeUser: null
    }
  }
  componentDidMount() {
    socket.on('LIST_USER', usernames => this.setState({ users: usernames }))
    socket.on('NEW_USER', username => {
      this.setState(prevState => ({
        users: prevState.users.concat(username)
      }));
    });

    socket.on('USER_DISCONNECT', username => {
      this.setState(prevState => ({
        users: prevState.users.filter(user => user !== username)
      }));
    });

    socket.on('SERVER_SEND_MESSAGE', message => {
      this.setState(prevState => ({ messages: prevState.messages.concat(message) }));
    });

    socket.on('CONFIRM_USERNAME', isSuccessful => {
      if (!isSuccessful) return alert('Choose another username');
      this.setState({ isLoggedIn: true });
      alert('Sign in successfully');
    });
  }

  onSignIn() {
    const username = this.refs.txtUsername.value;
    socket.emit('CLIENT_SIGN_IN', username);
  }

  onSendMessage() {
    const message = this.refs.txtMessage.value;
    this.refs.txtMessage.value = '';
    socket.emit('CLIENT_SEND_MESSAGE', message);
  }

  onSendPrivateMessage() {
    const message = this.refs.txtMessage.value;
    const { activeUser } = this.state;
    this.refs.txtMessage.value = '';
    socket.emit('CLIENT_SEND_PRIVATE_MESSAGE', { message, activeUser});
  }

  render() {
    const { users, isLoggedIn, messages, activeUser } = this.state;
    if (isLoggedIn) return (
      <div style={{ padding: '10px', display: 'flex', flexDirection: 'row' }}>
        <div>
          <input placeholder="Message" ref="txtMessage" />
          <br /><br />
          <button onClick={this.onSendMessage.bind(this)}>
            Send
          </button>
          <button onClick={this.onSendPrivateMessage.bind(this)}>
            Send private
          </button>
          <h4>Messages</h4>
          { messages.map((e, index) => <p key={index}>{e}</p>) }
        </div>
        <div style={{ padding: '10px', marginTop: 50 }}>
            <h4>User Online</h4>
            { users.map((e, index) => (
              <p 
                key={index}
                style={{ color: (activeUser === e) ? 'red': 'black' }}
                onClick={() => this.setState({ activeUser: e })}
              >
                {e}
              </p>)
            )}
        </div>
      </div>
    );
    return (
      <div style={{ padding: '10px' }}>
        <input placeholder="Username" ref="txtUsername" />
        <br /><br />
        <button onClick={this.onSignIn.bind(this)}>
          Sign In
        </button>
      </div>
    )
  }
}

export default App;

// mail: khoaphamtraining@gmail.com
// Chu de
// Code up len git
// Quay video demo
