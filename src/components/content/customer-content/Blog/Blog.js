import React, {useEffect, useState} from 'react';
import ArticlePreview from "./ArticlePreview";
import {instance} from "../../../../http/headerPlaceholder.instance";

const Blog = () => {
    const [articles, setArticles] = useState([])
    useEffect(() => {
        instance({
            method: "get",
            url: '/blog/offset/0',
        }).then(({data}) => setArticles(data))
    }, [])
    return (
        <div className="container">
            <div className="row">
                {
                    articles?.map(art =>
                        <ArticlePreview key={art.article_id} article={art}/>)
                }
            </div>
            <button className="btn btn-primary">Читать еще</button>
        </div>
    );
};

export default Blog;
