export interface IMessage {
    id: string; // Уникальный идентификатор сообщения
    sender_id: string; // Идентификатор пользователя, отправившего сообщение
    receiver_id: string; // Идентификатор пользователя, получившего сообщение
    content: string; // Текст сообщения
    timestamp: string; // Временная метка отправки сообщения
    media_url?: string[] | null;
}