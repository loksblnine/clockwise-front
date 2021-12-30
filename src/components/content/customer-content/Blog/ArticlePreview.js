import React, {useCallback} from 'react';
import ReactHtmlParser from "react-html-parser"

const ArticlePreview = ({article}) => {
    return (
        <div className="card col-md-3 m-3" key={article.article_id}>
            {
                article.photo &&
                <img className="card-img-top mt-3" src={article?.photo} alt="Card image cap" style={{height:"50%"}}/>
            }
            <div className="card-body" key={article.article_id}>
                <h5 className="card-title">{article.header}</h5>
                <div className="m-2" key={article.article_id}>
                    {ReactHtmlParser(article.body.split('.')[0])}
                </div>
                <a href={`/blog/${article.article_id}`} className="btn btn-primary-outline">Читать полностью...</a>
            </div>
        </div>
    );
};

export default ArticlePreview;
