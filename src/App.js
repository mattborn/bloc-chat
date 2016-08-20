import firebase from 'firebase';
import moment from 'moment';
import React from 'react';
import ReactFireMixin from 'reactfire';

import './App.css';
import Form from './Form';
import SignIn from './SignIn';

firebase.initializeApp({
  apiKey: 'AIzaSyCX1Q4yD-2vIE8YNM9Kjgtd3wm1ExIbp2o',
  authDomain: 'chat-1794e.firebaseapp.com',
  databaseURL: 'https://chat-1794e.firebaseio.com',
  storageBucket: '',
});
window.firebase = firebase;
window.moment = moment;

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
    console.log('App:render', this.state);
    const { messages, user } = this.state;
    return !user ? <SignIn /> : (
      <div>
        {
          messages.length ? messages.map((message, index) =>
            <div className="message" key={index}>
              <b>{message.user.displayName}</b>
              <em>{moment(message.time).fromNow()}</em>
              <span>{message.text}</span>
            </div>) : 'Loading messages…'
        }
        <Form messagesRef={this.messagesRef} user={user} />
      </div>
    );
  },
});
export default App;
