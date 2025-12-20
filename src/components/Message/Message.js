import React from 'react';
import './Message.css';

const Message = ({ type, children }) => {
  return (
    <div className="error-container">
      <div className={`message-container ${type}`}>
        <p>{children}</p>
      </div>
    </div>
  );
};

export default Message;
