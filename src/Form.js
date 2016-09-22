import React from 'react';

const Form = React.createClass({

  submit(e) {
    e.preventDefault();
    this.props.messagesRef.push({
      text: this.refs.text.value,
      time: Date.now(),
      user: {
        displayName: this.props.user.displayName,
        photoURL: this.props.user.photoURL,
        uid: this.props.user.uid,
      },
    });
    this.refs.text.value = '';
  },

  render() {
    return (
      <form className="form" onSubmit={this.submit}>
        <input className="form-input" placeholder="Write something…" ref="text"/>
        <button className="form-button">Send</button>
      </form>
    );
  }
});
export default Form;
