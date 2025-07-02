import React from 'react';
import '../styles/Message.css';

interface MessageProps {
    text: string;
    fromUser: boolean;
}

const Message: React.FC<MessageProps> = ({ text, fromUser }) => (
    <div className={fromUser ? 'message user' : 'message bot'}>
        {text}
    </div>
);

export default Message;