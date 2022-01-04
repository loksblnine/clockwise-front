import React, {useEffect} from 'react';
import ArticlePreview from "./ArticlePreview";
import {useDispatch, useSelector} from "react-redux";
import {setArticles} from "../../../../store/actions/blogActions";

const Blog = () => {
    const dispatch = useDispatch()
    const articles = useSelector((state) => state?.articles?.items)

    const {isReady, loadNext, page} = useSelector((state) => state?.articles)

    useEffect(() => {
        if (articles.length <= 0)
            dispatch(setArticles(page))
    }, [dispatch])

    const handleNextArticles = (e) => {
        e.target.disabled = true
        dispatch(setArticles(page))
        e.target.disabled = false
    }

    return (
        <div className="container">
            <div className="row">
                {
                    articles?.map(art =>
                        <ArticlePreview key={art.article_id} article={art}/>)
                }
            </div>
            {
                loadNext &&
                <div className="col text-center">
                    <button className="btn btn-primary" onClick={(e) => handleNextArticles(e)} disabled={!isReady}> Еще...
                    </button>
                </div>
            }
        </div>
    );
};

export default Blog;
