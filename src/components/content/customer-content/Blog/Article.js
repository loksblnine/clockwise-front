import React from 'react';
import ReactHtmlParser from "react-html-parser";
import {useLocation, withRouter} from "react-router-dom";

const Article = () => {
    const location = useLocation()
    const article = location.state
    return (
        <div key={article?.article_id}>
            <div id={`id${article?.article_id}`}>
                <div className="p-2">
                    <h3 className="d-flex justify-content-center m-5">{article?.header}</h3>
                    {
                        article?.photo && <div className="m-3 d-flex justify-content-center">
                            <img
                                src={article?.photo}
                                alt="article-photo"
                                style={{maxWidth: "50%", maxHeight: "35vh"}}
                            />
                        </div>
                    }
                    <div className="d-flex m-4 justify-content-center" key={article?.article_id}>
                        {ReactHtmlParser(article?.body)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Article);
