import React from 'react';
import './Messageboxx.css'; 

const MessageBox = ({ messages }) => {
  return (
    <div className="message-box-container">
      {messages.map((message, index) => (
        <div key={index} className="message-item">
          {message.isUser ? (
            <div className="question-message">{message.text}</div>
          ) : (
            <div className="answer-message">
              <div className="answer-text">{message.text}</div>
              {message.audioUrl && (
                <div className="audio-container">
                  <audio className="audio-player" controls>
                    <source src={message.audioUrl} type="audio/mpeg" />
                  </audio>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageBox;
