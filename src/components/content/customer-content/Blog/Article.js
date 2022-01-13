import React from 'react';
import ReactHtmlParser from "react-html-parser";

const Article = ({article}) => {
    return (
        <div key={article.article_id}>
                <button type="button" className="btn btn-outline-secondary m-4" data-toggle="modal"
                        data-target={`#id${article.article_id}`}>
                    Смотреть
                </button>
                <div className="modal fade" id={`id${article.article_id}`} tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <h3 className="m-5">{article.header}</h3>
                            {
                                article.photo &&
                                <img className="m-3" src={article?.photo} alt="article-photo"/>
                            }
                            <div className="m-4" key={article.article_id}>
                                {ReactHtmlParser(article.body)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Article;
