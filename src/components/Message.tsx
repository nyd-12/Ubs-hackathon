import React from 'react';
import { MessageType } from '../App';
import '../styles/Message.css';

const LoadingDots: React.FC = () => (
    <span className="loading-dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
    </span>
);

const Message: React.FC<MessageType> = ({ text, fromUser, loading }) => (
    <div className={fromUser ? 'message user' : 'message bot'}>
        {loading ? <LoadingDots /> : text}
    </div>
);

export default Message;