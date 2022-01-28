import {instance} from "../../http/headerPlaceholder.instance";
import {ACTIONS} from "../../utils/constants";

type Article = {
    article_id: number,
    article_header: string,
    body: string,
    photo: string
}

export const setArticles = (page: number) => {
    return async (dispatch: any) => {
        const {data}: any = await instance({
            method: "get",
            url: `/blog/offset/${page}`
        })
        dispatch({
            type: ACTIONS.BLOG.SET_ARTICLES,
            payload: data
        });
    }
}

export const updateArticle = (article: Article, id: number) => {
    return async (dispatch: any) => {
        await instance({
            method: "put",
            data: article,
            url: `/blog/${id}`
        })
        dispatch({
            type: ACTIONS.BLOG.UPDATE_ARTICLE,
            payload: article
        });
    }
}

export const addArticle = (article: Article, photo: string | "") => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "post",
            data: {...article, photo},
            url: "/blog"
        })
        dispatch({
            type: ACTIONS.BLOG.ADD_ARTICLE,
            payload: data
        })

    }
}

export const deleteArticle = (id: number) => {
    return async (dispatch: any) => {
        await instance({
            method: "delete",
            url: `/blog/${id}`
        })
        dispatch({
            type: ACTIONS.BLOG.DELETE_ARTICLE,
            payload: id
        });
    }
}

export const setArticlePhoto = (base64: string) => {
    return async (dispatch: any) => {
        dispatch({
            type: ACTIONS.BLOG.SET_ARTICLE_PHOTO,
            payload: base64
        });
    }
}
export const removeArticlePhoto = () => {
    return async (dispatch: any) => {
        dispatch({
            type: ACTIONS.BLOG.REMOVE_ARTICLE_PHOTO,
        });
    }
}
