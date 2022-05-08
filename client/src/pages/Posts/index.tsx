import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useStore} from "../../store";
import {PostItem} from "./Item";
import {Button, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {MY_POSTS_PATH} from "../../routes/paths";

interface PostsProps {
    author?: boolean
}

const Posts:React.FC<PostsProps> = observer(({author = false}) => {

    const {postStore, userStore} = useStore()

    const navigate = useNavigate()

    const handleCreate = () => {
        navigate(`/${MY_POSTS_PATH}/create`)
    }

    useEffect(() => {

        const params = author ? {userId: userStore.currentUser._id} : {};

        (async () => {
            await postStore.getPosts(params)
        })()
    }, [author])

    return (
        <>
            <Grid container justifyContent="flex-end" sx={{margin: '20px 0px 40px'}}>
               <Button
                    variant="contained"
                    onClick={handleCreate}
               >
                   Создать пост
               </Button>
            </Grid>
           <Grid container spacing={3}>
               {
                   postStore.posts.map(post => {
                       return (
                           <Grid key={post._id} item xs={3}>
                               <PostItem
                                   id={post._id}
                                   authorId={post.authorId}
                                   body={post.body}
                                   media={post.media}
                               />
                           </Grid>
                       )
                   })
               }
           </Grid>
        </>
    );
});

export { Posts };