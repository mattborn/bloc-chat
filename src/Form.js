import React from 'react';

const Form = React.createClass({

  submit(e) {
    e.preventDefault();

    const text = this.refs.text.value;
    if (text.trim()) {
      this.props.messagesRef.push({
        text: text,
        time: Date.now(),
        user: {
          displayName: this.props.user.displayName,
          photoURL: this.props.user.photoURL,
          uid: this.props.user.uid,
        },
      });
        // SCROLL MESSAGE ABOVE INPUT BOX ==
        window.setTimeout(function(){
		var body = document.body,
		html = document.documentElement;
		var height = Math.max( body.scrollHeight, body.offsetHeight,
		html.clientHeight, html.scrollHeight, html.offsetHeight );
		height = height + 2000;
		window.scroll(0,height);
                // CLEAR INPUT BOX UPON SEND ==
                document.getElementById("inputBox").value="";
        },500);

    }
  },

  render() {
    return (
      <form className="form" onSubmit={this.submit}>
        <input id="inputBox" ref="text"/>
        <button onClick="clearField">Send</button>
      </form>
    );

  }
});
export default Form;