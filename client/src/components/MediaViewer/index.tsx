import React, {useEffect, useState} from 'react';
import {CardMedia, styled} from "@mui/material";
import {download64String, downloadFile} from "../../helpers/download-file.helper";

const imgExt = ['jpg', 'jpeg', 'gif', 'svg', 'webp', 'png', 'ico']

const videoExt = ['mp4', 'webm', 'ogg']

const CustomBtn = styled('div')(() => ({
    color: '#0161d0',
    textDecoration: 'underline',
    cursor: 'pointer',
    margin: '15px 0'
}))


interface MediaViewerProps {
    media: any
    height: string
    width: string
    isLink?: boolean
}

const MediaViewer: React.FC<MediaViewerProps> = ({media, height, width, isLink= false}) => {

    const extension = (media && media.split('.')) ? media.split('.').pop() : ''

    const [ext, setExt] = useState(extension)

    const handleDownload = async () => {

        if(media.includes('base64')){
            return download64String(media)
        }

        await downloadFile(media)
    }

    useEffect(() => {
        const e = (media && media.split('.')) ? media.split('.').pop() : ''

        setExt(e.length > 12 ? 'base64': e)

    }, [media])

    return (
        <>
            {
                (imgExt.includes(`${ext}`) || (media.includes('base64') && media.includes('image')) ) &&
                <CardMedia
                    component="img"
                    height={height}
                    width={width}
                    image={media}
                    alt="green iguana"
                    sx={{maxWidth: width, objectFit: 'contain'}}
                />
            }
            {
                (videoExt.includes(`${ext}`) || (media.includes('base64') && media.includes('video'))) &&
                <video height={height} width={width} controls>
                    <source src={media} type="video/mp4" />
                    <source src={media} type="video/webm" />
                    <source src={media} type="video/ogg" />
                    Your browser does not support the video tag.
                </video>
            }

            {
                ext && isLink ?
                    <CustomBtn onClick={handleDownload}>
                        Скачать
                    </CustomBtn>
                    :
                !imgExt.includes(`${ext}`) && !videoExt.includes(`${ext}`) &&
                <CardMedia
                    component="img"
                    height={height}
                    width={width}
                    alt="Нет изображения или видео"
                />
            }
        </>
    );
};

export { MediaViewer };