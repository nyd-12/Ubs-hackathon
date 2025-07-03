import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import Drawer from './components/Drawer';
import moonStar from '../assets/moon-star.svg'; // Add this line if you add an SVG asset

export interface MessageType {
    text: string;
    fromUser: boolean;
    loading?: boolean;
}

interface ChatHistory {
    id: number;
    title: string;
    messages: MessageType[];
}

const App: React.FC = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [input, setInput] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
    const [currentChatId, setCurrentChatId] = useState<number | null>(null);
    const [mode, setMode] = useState<'light' | 'dark'>('light');
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

    // Save chat to history when a new chat starts
    useEffect(() => {
        if (messages.length === 1 && messages[0].fromUser) {
            // New chat started
            const newId = Date.now();
            setCurrentChatId(newId);
            setChatHistory(prev => [
                ...prev,
                { id: newId, title: messages[0].text.slice(0, 20) || 'New Chat', messages: [{ ...messages[0] }] }
            ]);
        } else if (messages.length > 1 && currentChatId) {
            setChatHistory(prev => prev.map(chat =>
                chat.id === currentChatId ? { ...chat, messages: [...messages] } : chat
            ));
        }
    }, [messages]);

    const handleOpenDrawer = () => setDrawerOpen(true);
    const handleCloseDrawer = () => setDrawerOpen(false);
    const handleSelectChat = (id: number) => {
        const chat = chatHistory.find(c => c.id === id);
        if (chat) {
            setMessages(chat.messages);
            setCurrentChatId(id);
            setDrawerOpen(false);
        }
    };

    return (
        <div className={`app-container app-${mode}`}>
            <Header onOpenDrawer={handleOpenDrawer} />
            <Drawer
                open={drawerOpen}
                onClose={handleCloseDrawer}
                chats={chatHistory.map(c => ({ id: c.id, title: c.title }))}
                onSelectChat={handleSelectChat}
                mode={mode}
            />
            <main className="main-content">
                <div style={{ position: 'absolute', top: 20, right: 30, zIndex: 2000 }}>
                    <label className="mode-switch">
                        <input
                            type="checkbox"
                            checked={mode === 'dark'}
                            onChange={() => setMode(mode === 'light' ? 'dark' : 'light')}
                        />
                        <span className="slider">
                            {mode === 'dark' ? (
                                // Moon SVG for dark mode
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="14" cy="14" r="12" fill="#fff" stroke="#ff2d2d" strokeWidth="2" />
                                    <path d="M19 14c0 2.76-2.24 5-5 5a5 5 0 010-10c.34 0 .67.03 1 .08A6 6 0 1019 14z" fill="#ff2d2d" />
                                    <circle cx="20.5" cy="9.5" r="1.5" fill="#ff2d2d" />
                                </svg>
                            ) : (
                                // Sun SVG for light mode
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="14" cy="14" r="8" fill="#ff2d2d" stroke="#ff2d2d" strokeWidth="2" />
                                    <g stroke="#ff2d2d" strokeWidth="2">
                                        <line x1="14" y1="2" x2="14" y2="7" />
                                        <line x1="14" y1="21" x2="14" y2="26" />
                                        <line x1="2" y1="14" x2="7" y2="14" />
                                        <line x1="21" y1="14" x2="26" y2="14" />
                                        <line x1="5.22" y1="5.22" x2="8.7" y2="8.7" />
                                        <line x1="19.3" y1="19.3" x2="22.78" y2="22.78" />
                                        <line x1="5.22" y1="22.78" x2="8.7" y2="19.3" />
                                        <line x1="19.3" y1="8.7" x2="22.78" y2="5.22" />
                                    </g>
                                </svg>
                            )}
                        </span>
                    </label>
                </div>
                <ChatArea messages={messages} messagesEndRef={messagesEndRef} />
                <ChatInput input={input} setInput={setInput} handleSend={handleSend} />
            </main>
        </div>
    );
};

export default App;