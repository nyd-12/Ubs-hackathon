import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import Drawer from './components/Drawer';

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

const App: React.FC = () => {    const [messages, setMessages] = useState<MessageType[]>([]);
    const [input, setInput] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
    const [currentChatId, setCurrentChatId] = useState<number | null>(null);
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
    };    return (
        <div className="app-container">
            <Header onOpenDrawer={handleOpenDrawer} />
            <Drawer
                open={drawerOpen}
                onClose={handleCloseDrawer}
                chats={chatHistory.map(c => ({ id: c.id, title: c.title }))}
                onSelectChat={handleSelectChat}
            />
            <main className="main-content">
                <ChatArea messages={messages} messagesEndRef={messagesEndRef} />
                <ChatInput input={input} setInput={setInput} handleSend={handleSend} />
            </main>
        </div>
    );
};

export default App;