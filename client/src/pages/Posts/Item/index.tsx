import React from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from "@mui/material/Typography";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store";
import {useNavigate} from "react-router-dom";
import {downloadFile} from "../../../helpers/download-file.helper";
import {MY_POSTS_PATH} from "../../../routes/paths";

const imgExt = ['jpg', 'jpeg', 'gif', 'svg', 'webp', 'png', 'ico']

const videoExt = ['mp4', 'webm', 'ogg']

interface PostItemProps {
    id: string
    authorId: string
    body: string
    media: any
}

const PostItem: React.FC<PostItemProps> = observer(({media, body, authorId, id}) => {

    const {userStore, postStore} = useStore()

    const navigate = useNavigate()

    const ext = media ? media.split('.').pop() : ''

    const handleDownload = async () => {
       await downloadFile(media)
    }

    const handleDelete = async () => {
        await postStore.delete(id)
    }

    const handleView = () => {
        navigate(`/${MY_POSTS_PATH}/${id}`)
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={handleView}>
                {
                    imgExt.includes(`${ext}`) &&
                    <CardMedia
                        component="img"
                        height="140"
                        image={media}
                        alt="green iguana"
                    />
                }
                {
                    videoExt.includes(`${ext}`) &&
                    <video height="140" width="100%" controls>
                        <source src={media} type="video/mp4" />
                        <source src={media} type="video/webm" />
                        <source src={media} type="video/ogg" />
                        Your browser does not support the video tag.
                    </video>
                }

                {
                    !imgExt.includes(`${ext}`) && !videoExt.includes(`${ext}`) &&
                    <CardMedia
                        component="img"
                        height="140"
                        alt="Нет изображения или видео"
                    />
                }

                <CardContent sx={{height: '150px', overflow: 'hidden'}}>
                    <Typography variant="body2" color="text.secondary">
                        {body}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>

                    <Tooltip title="Подробнее">
                        <IconButton onClick={handleView}>
                            <PreviewIcon />
                        </IconButton>
                    </Tooltip>
                {
                    (userStore.currentUser._id === authorId) &&
                        <Tooltip title="Удалить">
                            <IconButton onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                }
                {
                    media &&
                        <Tooltip title="Скачать файл">
                            <IconButton onClick={handleDownload}>
                                <CloudUploadIcon />
                            </IconButton>
                        </Tooltip>
                }
            </CardActions>
        </Card>
    );
});

export { PostItem };