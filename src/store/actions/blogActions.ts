import * as constants from "../../utils/constants";
import {instance} from "../../http/headerPlaceholder.instance";

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
            type: constants.ACTIONS.BLOG.SET_ARTICLES,
            payload: data
        });
    }
}

export const updateArticle = (article:Article, id: number) => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "PUT",
            data: article,
            url: `/blog/${id}`
        })
        dispatch({
            type: constants.ACTIONS.BLOG.UPDATE_ARTICLE,
            payload: data
        });
    }
}

export const addArticle= (article:Article) => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "POST",
            data: article,
            url: "/blog"
        })
        dispatch({
            type: constants.ACTIONS.BLOG.ADD_ARTICLE,
            payload: data
        })

    }
}

export const deleteArticle = (id: number) => {
    return async (dispatch: any) => {
        await instance({
            method: "DELETE",
            url: `/blog/${id}`
        })
        dispatch({
            type: constants.ACTIONS.BLOG.DELETE_ARTICLE,
            payload: id
        });
    }
}
