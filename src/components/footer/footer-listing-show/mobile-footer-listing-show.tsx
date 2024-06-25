import React, { ChangeEvent, useEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

interface MobileFooterProps {
    onChatOpen: () => void;
    onCarPageOpen: () => void;
    openTab?: string;
    chatOpen?: boolean;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ onChatOpen, onCarPageOpen, openTab = 'listing', chatOpen = false }) => {
    const [activeTab, setActiveTab] = useState(openTab);

    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        const tabMap = ['listing', 'chat'];
        setActiveTab(tabMap[newValue]);
        if (tabMap[newValue] === 'chat') {
            onChatOpen();
        } else if (tabMap[newValue] === 'listing') {
            onCarPageOpen();
        }
    };

    useEffect(() => {
        if (!chatOpen) {
            setActiveTab('listing');
        } else if (chatOpen) {
            setActiveTab('chat');
        }
    }, [chatOpen]);

    return (
        <BottomNavigation
            value={activeTab === 'listing' ? 0 : 1}
            onChange={handleChange}
            style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                zIndex: 1000000,
                display: 'flex',
                justifySelf: 'center',
                marginLeft: '-50px',
                justifyContent: 'center' // Центрирование дочерних элементов
            }}
        >
            <BottomNavigationAction
                label="Объявление"
                icon={<DirectionsCarIcon />}
                style={activeTab === 'listing' ? { color: 'blue' } : {}}
            />
            <BottomNavigationAction
                label="Чат"
                icon={<ChatIcon />}
                style={activeTab === 'chat' ? { color: 'blue' } : {}}
            />
        </BottomNavigation>
    );
};

export default MobileFooter;
