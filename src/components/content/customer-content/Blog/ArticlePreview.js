import React from 'react';
import ReactHtmlParser from "react-html-parser"
import {useDispatch, useSelector} from "react-redux";
import {deleteArticle} from "../../../../store/actions/blogActions";
import {useHistory} from "react-router-dom";

const ArticlePreview = ({article}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const role = useSelector(state => state.users.user.role)
    return (
        <div className="col-md-4">
            <div className="card p-3 m-2" key={article.article_id}>
                {
                    article.photo &&
                    <img className="card-img-top mt-3" src={article?.photo} alt="Card image cap"
                         style={{height: "50%"}}/>
                }
                <div className="card-body" key={article.article_id}>
                    <h5 className="card-title">{article.header}</h5>
                    <div className="m-2" key={article.article_id}>
                        {ReactHtmlParser(article.body.split('.')[0])}
                    </div>
                    <button type="button" className="btn btn-outline-secondary m-4"
                            onClick={(e) => {
                                e.preventDefault()
                                history.push({
                                    pathname: "/article",
                                    state: article
                                })
                            }}
                    >
                        Смотреть
                    </button>
                    {role === 1 &&
                        <div className="d-flex m-4">
                            <button className="btn btn-warning m-2"
                                    onClick={() => {
                                        history.push({
                                            pathname: `/blog/edit`,
                                            state: article
                                        })
                                    }}>Редактировать
                            </button>
                            <button className="btn btn-danger m-2"
                                    onClick={() => dispatch(deleteArticle(article.article_id))}>Удалить
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ArticlePreview;
