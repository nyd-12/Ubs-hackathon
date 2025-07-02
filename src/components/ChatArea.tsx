import React from 'react';
import Message from './Message';
import '../styles/ChatArea.css';

interface ChatAreaProps {
    messages: { text: string; fromUser: boolean }[];
    messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, messagesEndRef }) => (
    <div className="chat-area">
        {messages.length === 0 && (
            <div className="chat-empty">Start the conversation!</div>
        )}
        {messages.map((msg, idx) => (
            <Message key={idx} text={msg.text} fromUser={msg.fromUser} />
        ))}
        <div ref={messagesEndRef} />
    </div>
);

export default ChatArea;