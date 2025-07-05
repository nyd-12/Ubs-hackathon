import React from 'react';
import '../styles/ChatInput.css';

interface ChatInputProps {
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    handleSend: (e: React.FormEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, handleSend }) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            // Submit the form
            (e.target as HTMLTextAreaElement).form?.requestSubmit();
        }
        // Shift+Enter will insert a new line by default in textarea
    };

    return (
        <form onSubmit={handleSend} className="chat-input-form">
            <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message..."
                className="chat-input"
                rows={1}
                onKeyDown={handleKeyDown}
            />
            <button type="submit" className="chat-send-btn">
                Send
            </button>
        </form>
    );
};

export default ChatInput;