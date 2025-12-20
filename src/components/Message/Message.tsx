import React from 'react';
import './Message.css';

interface MessageProps {
  type: string;
  children: React.ReactNode;
}

const Message: React.FC<MessageProps> = ({ type, children }) => {
  return (
    <div className="error-container">
      <div className={`message-container ${type}`}>
        <p>{children}</p>
      </div>
    </div>
  );
};

export default Message;

