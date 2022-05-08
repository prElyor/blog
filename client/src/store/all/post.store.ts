import {makeAutoObservable, runInAction} from "mobx";
import {PostModel, PostModelCreate, PostModelQueryParams, PostModelUpdate} from "../../models/post.model";
import {apiCreatePost, apiDeletePost, apiGetPostById, apiGetPosts, apiUpdatePost} from "../../api";

export class PostStore {

    posts: PostModel[] = []
    activePost: PostModel | null = null

    body: string = ''
    media: any = ''
    mediaUri: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    setBody (body: string) {
        this.body = body
    }

    setMedia (media: any){
        this.media = media
    }

    setMediaUri (uri: string){
        this.mediaUri = uri
    }

    setActivePostById (id: string) {
        this.activePost = this.posts.filter(p => p._id === id)[0]
    }

    setActivePost (post: PostModel | null) {
        this.activePost = post
    }

    returnParams (): PostModelCreate {
        const mediaType = typeof this.media

        let params: PostModelCreate = {
            body: this.body
        }

        if(mediaType !== "string" && this.media){
            params = {
                ...params,
                media: this.media
            }
        }

        return params
    }

    async getPosts (params: PostModelQueryParams) {
        try {

            const response = await apiGetPosts(params)

            runInAction(() => {
                this.posts = response.data
            })

        }catch (e) {
            return Promise.reject(e)
        }
    }

    async getPostById (id: string) {
        try {

            const response = await apiGetPostById(id)

            runInAction(() => {
                this.activePost = response.data

                this.mediaUri = response.data.media
                this.body = response.data.body
            })

        }catch (e) {
            return Promise.reject(e)
        }
    }

    async create () {
        try {

            const params = this.returnParams()

            const response = await apiCreatePost(params)

            runInAction(() => {

                this.posts.push(response.data)

                this.body = ''
                this.media = ''
                this.mediaUri = ''
            })

            return Promise.resolve(response)

        }catch (e) {
            return Promise.reject(e)
        }
    }

    async update () {
        try {

            if(!this.activePost?._id){
               return
            }

            const params: PostModelUpdate = {
                id: this.activePost?._id,
                ...this.returnParams()
            }

            const response = await apiUpdatePost(params)

            runInAction(() => {
                this.activePost = response.data
                this.posts = this.posts.map(p => {
                    if(p._id === response.data._id){
                        return response.data
                    }

                    return p
                })

                this.body = ''
                this.media = ''
                this.mediaUri = ''
            })

        }catch (e) {
            return Promise.reject(e)
        }
    }

    async delete (id: string) {
        try {

           await apiDeletePost(id)

            runInAction(() => {
                this.posts = this.posts.filter(p => p._id !== id)
            })

        }catch (e) {
            return Promise.reject(e)
        }
    }
}