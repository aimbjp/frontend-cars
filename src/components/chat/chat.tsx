import React, { useEffect, useState, useRef } from 'react';
import { fetchUsers } from '../../services/api/users';
import { IUser } from "../../type/user/user-types";
import {
    Container, TextField, Button, Select, MenuItem, List, ListItem,
    Typography, styled, TypographyProps, Tooltip, Box, Avatar, IconButton
} from '@mui/material';
import { useSelector } from "../../services/hooks";
import { IMessage } from "../../type/chat-types";
import io from "socket.io-client";
import ModalImage from "react-modal-image";
import {Link} from "react-router-dom";
import {URL_API} from "../../services/api/links";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';



// Стилизация текста сообщения
const MessageText = styled(({ fromSelf, ...otherProps }: TypographyProps & { fromSelf?: boolean }) => (
    <Typography {...otherProps} />
))(({ theme, fromSelf }) => ({
    textAlign: fromSelf ? 'right' : 'left',
    width: '100%',
    display: 'block',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fromSelf ? theme.palette.primary.light : theme.palette.grey[200],
    color: fromSelf ? 'white' : 'black',
    margin: theme.spacing(0.5, 0),
    maxWidth: 'fit-content',
    '&:hover': {
        backgroundColor: fromSelf ? theme.palette.primary.dark : theme.palette.grey[300],
    },
    img: {
    }
}));

const StyledList = styled(List)(({ theme }) => ({
    maxHeight: '60vh', // Высота списка сообщений
    overflowY: 'auto',
    marginBottom: theme.spacing(2),
    paddingRight: '4px', // Для скроллбара
}));

const Chat = () => {
    const [users, setUsers] = useState<Array<IUser>>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Array<IMessage & { fromSelf?: boolean }>>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const currentUser = useSelector((state) => state.userReducer.user);
    const socketRef = useRef<ReturnType<typeof io> | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null); // Для автоскролла
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        socketRef.current = io({
            path: '/socket.io',
            auth: {
                token: localStorage.getItem('accessToken'),
            },
        });

        socketRef.current.on('receiveMessage', (message: IMessage) => {
            if (message.sender_id === selectedUserId || message.sender_id === currentUser.userId) {
                setMessages((prevMessages) => [...prevMessages, { ...message, fromSelf: message.sender_id === currentUser.userId }]);
            }
        });

        const getUsers = async () => {
            const usersList = await fetchUsers();
            setUsers(usersList);
        };

        getUsers();

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [currentUser.userId, selectedUserId]);

    useEffect(() => {
        if (!selectedUserId || !socketRef.current) return;

        socketRef.current.emit('getMessagesHistory', { partnerId: selectedUserId });

        socketRef.current.on('messagesHistory', (receivedMessages: IMessage[]) => {
            setMessages(receivedMessages.map((msg) => ({
                ...msg,
                fromSelf: msg.sender_id === currentUser.userId,
            })));
        });

        return () => {
            socketRef.current?.off('messagesHistory');
        };
    }, [selectedUserId, currentUser.userId]);

    useEffect(() => {

        const timer = setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 1000);

        return () => clearTimeout(timer);

    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedUserId) {
            let mediaUrlsToSend: string[] = [];
            if (selectedFiles.length > 0) {
                mediaUrlsToSend = await uploadFiles();
            }
            if (mediaUrlsToSend.length > 0 || currentMessage) {
                socketRef.current?.emit("sendMessage", {
                    receiver_id: selectedUserId,
                    content: currentMessage,
                    media_url: mediaUrlsToSend.length > 0 ? JSON.stringify(mediaUrlsToSend) : null,
                });

                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        content: currentMessage,
                        fromSelf: true, sender_id:
                            currentUser.userId || '',
                        receiver_id: selectedUserId,
                        timestamp: new Date().toISOString(),
                        id: `temp-${Date.now()}`,
                        media_url: mediaUrlsToSend.length > 0 ? mediaUrlsToSend : null,
                    }
                ]);


                setCurrentMessage('');
                setMediaUrls([]);
                setSelectedFiles([]);
                setFileInputKey(Date.now());
            }
        }

    };


    const handleSelectUser = (userId: string) => {
        setSelectedUserId(userId);
        socketRef.current?.emit('getMessagesHistory', { partnerId: userId });
    };

    const [mediaUrls, setMediaUrls] = useState<string[]>([]);

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const newFiles = Array.from(event.target.files);
            setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
        }

        setFileInputKey(Date.now());

    };

    const handleFileDelete = (index: number) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const uploadFiles = async () => {
        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('files', file);
        });

        try {
            const response = await fetch(URL_API + '/upload', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                return data.filesUrls;
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error("Ошибка при загрузке файлов:", error);
            return [];
        }
    };

    const [fileInputKey, setFileInputKey] = useState(Date.now());

    const resetFileInput = () => {
        setFileInputKey(Date.now());
    };


    return (
        <Container maxWidth="sm" sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
            <Link to={'/profile'}>Profile</Link>
            <br/>
            <Link to={'/'}>home page</Link>
            <br/>

            <Select value={selectedUserId || ''} onChange={(e) => handleSelectUser(e.target.value)} fullWidth sx={{ marginBottom: 2 }}>
                <MenuItem value="">Выберите пользователя...</MenuItem>
                {users.map((user) => (
                    <MenuItem key={user.userId} value={user.userId}>{user.username}</MenuItem>
                ))}
            </Select>
            <StyledList>
                {messages.map((message, index) => (
                    <ListItem key={index} sx={{ display: 'flex', justifyContent: message.fromSelf ? 'flex-end' : 'flex-start' }}>
                        <Tooltip title={`Отправлено: ${new Date(message.timestamp).toLocaleString()}`} placement="top" arrow>
                            <div>
                                {message.content &&
                                    <MessageText fromSelf={message.fromSelf ?? false}>
                                        {message.content}
                                    </MessageText>}

                                { message.media_url &&     <MessageText fromSelf={message.fromSelf ?? false}>
                                            {message.media_url.map((url, index) => (
                                                <ModalImage
                                                    key={index}
                                                    small={url}
                                                    large={url}
                                                    alt="Предварительный просмотр изображения"
                                                />
                                                ))}
                                        </MessageText>
                                }
                            </div>
                        </Tooltip>
                    </ListItem>
                ))}
                <div ref={messagesEndRef} />
            </StyledList>
            <Box component="form" onSubmit={handleSendMessage} sx={{mt: 'auto'}}>
                <TextField
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    fullWidth
                    variant="outlined"
                    placeholder="Введите сообщение..."
                    sx={{marginBottom: 1}}
                />
                <input
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    key={fileInputKey}
                    style={{display: 'none'}}
                    ref={fileInputRef}
                />
                <Button onClick={() => fileInputRef.current?.click()}>Загрузить файлы</Button>
                <div>
                    {selectedFiles.map((file, index) => (
                        <Box key={index} sx={{display: 'flex', alignItems: 'center', margin: 1}}>
                            <Avatar src={URL.createObjectURL(file)} sx={{width: 56, height: 56, marginRight: 2}}/>
                            <Typography variant="body2" sx={{flexGrow: 1}}>{file.name}</Typography>
                            <IconButton onClick={() => handleFileDelete(index)} edge="end" aria-label="delete">
                                <DeleteIcon/>
                            </IconButton>
                            <IconButton onClick={() => fileInputRef.current?.click()} edge="end" aria-label="add files">
                                <AddCircleOutlineIcon/>
                            </IconButton>
                        </Box>
                    ))}
                </div>
                <Button type="submit" variant="contained" color="primary"
                        sx={{marginTop: '8px', width: '100%'}}>Отправить</Button>
            </Box>
        </Container>
    )
        ;
};

export default Chat;
