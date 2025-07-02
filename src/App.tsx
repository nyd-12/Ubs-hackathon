import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';

const App: React.FC = () => {
    const [messages, setMessages] = useState<{ text: string; fromUser: boolean }[]>([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === '') return;
        setMessages([...messages, { text: input, fromUser: true }]);
        setInput('');
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