import {URL_API} from "./links";

export const uploadFiles = async (selectedFiles: File[]) => {
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