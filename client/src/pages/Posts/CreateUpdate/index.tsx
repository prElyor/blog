import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import {Button, Grid, styled} from "@mui/material";
import {useStore} from "../../../store";
import {MediaViewer} from "../../../components/MediaViewer";
import {toast} from "react-toastify";

const TextArea = styled('textarea')(() => ({
    width: '100%',
    resize: 'vertical',
    outline: 'none',
    border: '1px solid #d4d4d4',
    borderRadius: 0,
    padding: '10px',
    minHeight: '100px',
    height: '100%'
}))

const Input = styled('input')(() => ({
    display: 'none'
}))


const CreateUpdatePost = observer(() => {

    const {id} = useParams()

    const [disabled, setDisabled] = useState(true)
    const [isCreate, setIsCreate] = useState(id === 'create')

    const ref = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()

    const {postStore, userStore} = useStore()


    const isAuthor = userStore.currentUser._id === postStore.activePost?.authorId

    // конвертация в base64
    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };


    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e.target?.files && e.target?.files.length){

            if (e.target?.files[0].size > 30000 * 1000) {
                toast.error('Размер файла должен быть не больше 30 мб', {
                    toastId: 'customId'
                })
              return
            }

            postStore.setMedia(e.target?.files[0])

            const base64Url = await convertBase64(e.target?.files[0])

            postStore.setMediaUri(base64Url as string)

        }else{
            postStore.setMedia('')
        }
    }

    const handleUploadButton = () => {
        if(ref.current){
            ref.current.click()
        }
    }

    const handleDeleteMedia = () => {
        postStore.setMediaUri('')
    }


    const handleSave = async () => {
        if(id === 'create'){
            await postStore.create()
        }else {
            await postStore.update()
        }
        navigate(-1)
    }

    useEffect(() => {

        if(id && id !== 'create'){
            (async () => {
                setIsCreate(false)
                await postStore.getPostById(id)
            })()
        }

        if(id === 'create'){
            setIsCreate(true)
            setDisabled(false)
        }

    }, [id])


    return (
        <>
            {
                !isCreate && isAuthor &&
                <Grid container justifyContent="flex-end" sx={{marginBottom: '20px'}}>
                    <Button variant="contained" onClick={() => setDisabled(!disabled)}>
                        {
                            disabled ? 'Редактировать' : 'Отменить редактирование'
                        }
                    </Button>
                </Grid>
            }
                <MediaViewer
                    media={postStore.mediaUri}
                    height={'300px'}
                    width={'300px'}
                    isLink
                />
            <Grid container sx={{marginTop: '10px'}}>
                <TextArea
                    value={postStore.body}
                    disabled={disabled}
                    onChange={e => postStore.setBody(e.target.value)}
                    placeholder="Текст"
                />
            </Grid>

            {
                (isAuthor || isCreate) &&
                <Grid container sx={{marginTop: '20px'}}>
                    <Button
                        startIcon={<UploadIcon />}
                        sx={{backgroundColor: '#583fe5'}}
                        variant="contained"
                        disabled={disabled}
                        onClick={handleUploadButton}
                    >
                        Загрузить файл
                    </Button>
                    <Button
                        startIcon={<SaveOutlinedIcon />}
                        sx={[
                            {
                                backgroundColor: '#35803c',
                                marginLeft: '15px',
                                '&:hover': {
                                    backgroundColor: '#92f188'
                                }
                            }
                        ]}
                        variant="contained"
                        disabled={disabled}
                        onClick={handleSave}
                    >
                        Сохранить
                    </Button>
                    {
                        postStore.mediaUri &&
                        <Button
                            startIcon={<DeleteIcon />}
                            sx={[
                                {
                                    backgroundColor: '#afafaf',
                                    marginLeft: '15px',
                                    '&:hover': {
                                        backgroundColor: '#fa9595'
                                    }
                                }
                            ]}
                            variant="contained"
                            disabled={disabled}
                            onClick={handleDeleteMedia}
                        >
                            Удалить файл
                        </Button>
                    }
                    <Input
                        ref={ref}
                        onChange={handleChange}
                        type="file"
                    />
                </Grid>
            }
        </>
    );
});

export { CreateUpdatePost };