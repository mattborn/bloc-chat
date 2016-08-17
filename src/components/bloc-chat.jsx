import React from "react";
import ReactFireMixin from "reactfire";

import SignIn from "./sign-in";

const BlocChat = React.createClass({

  messagesRef: firebase.database().ref("messages"), // eslint-disable-line no-undef
  usersRef: firebase.database().ref("users"), // eslint-disable-line no-undef

  mixins: [ReactFireMixin],

  getInitialState() {
    return {
      messages: [],
      user: null
    };
  },

  componentWillMount() {
    const self = this;
    firebase.auth().onAuthStateChanged((authData) => { // eslint-disable-line no-undef
      if (authData) {
        self.setState({user: authData});
      }
    });
    this.bindAsArray(this.messagesRef, "messages");
  },

  render() {
    // console.log("BlocChat:render", this.state);
    const { messages, user } = this.state;
    return !user ? <SignIn /> : (
      <div>
        {
          messages.length ? messages.map((message, index) =>
            <div key={index}>
              <b>{message.user.displayName}</b>
              <span>{message.text}</span>
            </div>) : "Loading messages…"
        }
        <form onSubmit={(e) => e.preventDefault()}>
          <input ref="text"/>
          <button onClick={() =>
            this.messagesRef.push({
              text: this.refs.text.value,
              user: {
                displayName: user.displayName,
                photoURL: user.photoURL,
                uid: user.uid
              }
            })}
          >Send</button>
        </form>
      </div>
    );
  }
});
export default BlocChat;
