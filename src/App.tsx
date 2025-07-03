import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';

export interface MessageType {
    text: string;
    fromUser: boolean;
    loading?: boolean;
}

const App: React.FC = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === '') return;

        // Add user message
        setMessages(prev => [...prev, { text: input, fromUser: true }]);
        setInput('');

        // Add loading message
        setMessages(prev => [
            ...prev,
            { text: '', fromUser: false, loading: true }
        ]);

        // Simulate backend delay
        setTimeout(() => {
            setMessages(prev => {
                // Remove the last loading message
                const updated = prev.filter((msg, idx) => !(idx === prev.length - 1 && msg.loading));
                // Add backend response
                return [
                    ...updated,
                    { text: 'You just sent a prompt!', fromUser: false }
                ];
            });
        }, 1200); // 1.2 seconds delay
    };

    return (
        <div className="app-container">
            <Header />
            <main className="main-content">
                <ChatArea messages={messages} messagesEndRef={messagesEndRef} />
                <ChatInput input={input} setInput={setInput} handleSend={handleSend} />
            </main>
        </div>
    );
};

export default App;