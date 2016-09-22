import firebase from 'firebase';
import React from 'react';
import ReactFireMixin from 'reactfire';

import './App.css';
import Form from './Form';
import List from './List';
import SignIn from './SignIn';

firebase.initializeApp({
  apiKey: 'AIzaSyCX1Q4yD-2vIE8YNM9Kjgtd3wm1ExIbp2o',
  authDomain: 'chat-1794e.firebaseapp.com',
  databaseURL: 'https://chat-1794e.firebaseio.com',
  storageBucket: '',
});
window.firebase = firebase;

const App = React.createClass({

  messagesRef: firebase.database().ref('messages'),

  mixins: [ReactFireMixin],

  getInitialState() {
    return {
      messages: [],
      user: null,
    };
  },

  componentWillMount() {
    const self = this;
    firebase.auth().onAuthStateChanged((authData) => {
      if (authData) {
        self.setState({user: authData});
      }
    });
    this.bindAsArray(this.messagesRef, 'messages');
  },

  render() {
    // console.log('App:render', this.state);
    const { messages, user } = this.state;
    return !user ? <SignIn /> : (
      <div>
        {
          messages.length ? <List messages={messages} /> : 'Loading messages…'
        }
        <Form messagesRef={this.messagesRef} user={user} />
      </div>
    );
  },
});
export default App;
