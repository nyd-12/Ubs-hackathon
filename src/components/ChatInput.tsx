import React from 'react';
import '../styles/ChatInput.css';

interface ChatInputProps {
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    handleSend: (e: React.FormEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, handleSend }) => (
    <form onSubmit={handleSend} className="chat-input-form">
        <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            className="chat-input"
        />
        <button type="submit" className="chat-send-btn">
            Send
        </button>
    </form>
);

export default ChatInput;