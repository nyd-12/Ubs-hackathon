import React from 'react';
import '../styles/Drawer.css';

interface DrawerProps {
    open: boolean;
    onClose: () => void;
    chats: { id: number; title: string }[];
    onSelectChat: (id: number) => void;
}

const Drawer: React.FC<DrawerProps> = ({ open, onClose, chats, onSelectChat }) => {
    return (
        <div className={`drawer${open ? ' open' : ''}`}>
            <div className="drawer-header">
                <span>Historical Chats</span>
                <button className="drawer-close" onClick={onClose}>&times;</button>
            </div>
            <ul className="drawer-list">
                {chats.length === 0 ? (
                    <li className="drawer-empty">No chats yet.</li>
                ) : (
                    chats.map(chat => (
                        <li key={chat.id} className="drawer-item" onClick={() => onSelectChat(chat.id)}>
                            {chat.title}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Drawer;
