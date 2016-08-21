import moment from 'moment';
import React, { PropTypes } from 'react';

const List = React.createClass({

  propTypes: {
    messages: PropTypes.array.isRequired,
  },

  getDefaultProps() {
    return {
      messages: [],
    };
  },

  render() {
    return (
        <div>
          {
            this.props.messages.map((message, index) =>
              <div className="message" key={index}>
                <img className="message-photo" alt={message.user.displayName} src={message.user.photoURL}/>
                <div className="message-body">
                  <b className="message-name">{message.user.displayName}</b>
                  <em className="message-time">{moment(message.time).fromNow()}</em>
                  <div className="message-text">{message.text}</div>
                </div>
              </div>
            )
          }
        </div>
    );
  }
});
export default List;
