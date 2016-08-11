import firebase from "firebase";
import React from "react";
import ReactFireMixin from "reactfire";

const BlocChat = React.createClass({

  mixins: [ReactFireMixin],

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyCX1Q4yD-2vIE8YNM9Kjgtd3wm1ExIbp2o",
      authDomain: "chat-1794e.firebaseapp.com",
      databaseURL: "https://chat-1794e.firebaseio.com",
      storageBucket: ""
    });
    const ref = firebase.database().ref("messages");
    this.bindAsArray(ref, "messages");
  },

  render() {
    // console.log("BlocChat:render", this.state);
    const { messages } = this.state;
    return (
      <div>
        {
          messages.length ? messages.map((message, index) =>
          <div key={index}>{message.text}</div>) : "Loading messages…"
        }
        <form onSubmit={(e) => e.preventDefault()}>
          <input ref="text"/>
          <button onClick={() =>
            firebase.database().ref("messages").push({
              text: this.refs.text.value
            })}
          >Send</button>
        </form>
      </div>
    );
  }
});
export default BlocChat;
