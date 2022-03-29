import {instance} from "./index";

export interface DataCreatePostParams {
    title: string;
    description?: string;
    imgUrl?: string;
    text: string;
}

export const postsApi = {
    getUserPagePosts(currentPage: number, pageSize: number, id: string | undefined) {
        return instance
            .get(`posts?userId=${id}&page=${currentPage}&limit=${pageSize}`)
            .then((resp) => resp.data);
    },
    addImgFilePost(formData: any) {
        return instance
            .post(`/posts/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((resp) => resp.data);
    },
    addPost(data: DataCreatePostParams) {
        return instance
            .post('/posts', data)
            .then((resp) => resp.data);
    }

}