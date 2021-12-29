import React, {useCallback} from 'react';
import ReactHtmlParser from "react-html-parser"

const ArticlePreview = ({article}) => {
    const cutPreview = useCallback((htmlText) => {
        return (htmlText[0].props.children[0].props.children)
    }, [])
    return (
        <div className="card col-md-3 m-3" key={article.article_id}>
            {/*<img className="card-img-top" src="..." alt="Card image cap">*/}
            <div className="card-body" key={article.article_id}>
                <h5 className="card-title">{article.header}</h5>
                <div className="m-2" key={article.article_id}>
                    {cutPreview(ReactHtmlParser(article.body.split('.')[0]))}
                </div>
                <a href={`/blog/${article.article_id}`} className="btn btn-primary-outline">Читать полностью...</a>
            </div>
        </div>
    );
};

export default ArticlePreview;
