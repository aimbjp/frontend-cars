import React, {ChangeEvent, FC, useEffect, useRef, useState} from "react";
import {Box, Button, CircularProgress, IconButton, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {motion} from "framer-motion";
import {setActivePhotos} from "../../../services/thunks/listing-add";
import {useDispatch, useSelector} from "../../../services/hooks";
import {styled} from "@mui/system";
import {LoaderWithoutMargin} from "../../elements";

export const AddListingPhoto: FC = () => {
    const dispatch = useDispatch();
    const {activeImages} = useSelector(store => store.listingReducer);
    const [uploadingPhotos, setUploadingPhotos] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<{ file?: File, preview: string }[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const PreviewImage = styled('img')({
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    });

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files).map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }));
            setSelectedFiles(prev => [...prev, ...filesArray]);
        }
    };

    const uploadFiles = async () => {
        setUploadingPhotos(true);
        const formData = new FormData();
        selectedFiles.forEach(fileObj => {
            if (fileObj.file) {
                formData.append('files', fileObj.file);
            }
        });

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(setActivePhotos(activeImages ? [...activeImages, ...data.filesUrls] : data.filesUrls));
                setSelectedFiles(files => files.filter(f => f.file));
                setUploadingPhotos(false);
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error("Error uploading files:", error);
            setUploadingPhotos(false);
        }
    };

    const removeSelectedFile = (index: number) => {
        const fileToRemove = selectedFiles[index];

        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        if (activeImages){
            const newActiveImages = activeImages.filter((_, i) => i !== index);
            dispatch(setActivePhotos(newActiveImages));
        }


    };

    useEffect(() => {
        if (activeImages) {
            const imageFiles = activeImages.map(img => ({ preview: img }));
            setSelectedFiles(imageFiles);
        }
    }, []);

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            style={{width: '100%'}}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
                margin: 'auto',
                maxWidth: 700,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                borderRadius: '16px',
                backgroundColor: 'white',
                mt: 4,
                gap: 2
            }}>
                <Typography variant="h6">Фото</Typography>
                <Button variant="outlined" onClick={() => fileInputRef.current?.click()}>
                    Загрузить фото
                </Button>
                <input
                    data-testid="file-input"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    style={{display: 'none'}}
                    ref={fileInputRef}
                />
                <Button onClick={uploadFiles} variant="contained" sx={{mt: 2}}>
                    Подтвердить загрузку
                </Button>

                {uploadingPhotos &&
                    <div style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
                        <CircularProgress/>
                    </div>
                }

                <Typography variant="h6" sx={{mt: 2}}>Предпросмотр фото</Typography>
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 2}}>
                    {selectedFiles.map((file, index) => (
                        <Box key={index} sx={{width: 100, height: 100, position: 'relative'}}>
                            <PreviewImage src={file.preview} alt="Preview"/>
                            <IconButton onClick={() => removeSelectedFile(index)} size="small"
                                        data-testid={`delete-button-${index}`}
                                        sx={{position: 'absolute', top: 0, right: 0}}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            </Box>
        </motion.div>
    );
};
