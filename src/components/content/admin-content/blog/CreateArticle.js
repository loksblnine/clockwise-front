import React, {useRef, useState} from 'react';
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {Editor} from '@tinymce/tinymce-react';

import Article from "../../customer-content/Blog/Article";
import {addArticle, removeArticlePhoto, setArticlePhoto} from "../../../../store/actions/blogActions";

import {ONE_MEGABYTE} from "../../../../utils/constants";

const CreateArticle = () => {
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const photo = useSelector((state) => state.articles.photo) || ""
    const initArticle = {
        body: "<p>Начните писать свою статью</p>",
        header: ""
    }
    const editorRef = useRef(null);
    const [article, setArticle] = useState(initArticle)
    const handleChooseFile = (e) => {
        if (e?.target?.files[0]?.size < ONE_MEGABYTE) {
            if (e.target?.files[0]?.type.split('/')[0] === "image") {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onloadend = () => {
                    dispatch(setArticlePhoto(reader.result))
                    e.target.value = ""
                };
            } else {
                toast.info("Только фотографии")
            }
        } else {
            toast.info("Файл неприлично много весит!")
        }
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setArticle(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div>
            <form onSubmit={() => {
                setArticle((prevState => {
                    return ({
                        ...prevState,
                        body: article?.body
                    })
                }))
                dispatch(addArticle(article, photo))
            }}>
                <div className="m-4">
                    <div className="form-group">
                        <label>Фото статьи</label>
                        <input type="file" className="d-none" name="photo"
                               id="file-input" key="file-input"
                               accept="image/*" ref={inputRef}
                               onInput={e => handleChooseFile(e)}
                        />
                        <input type="text" className="form-control" readOnly
                               value={photo.length === 0 ? "Добавить фото..." : "Изменить фото"}
                               onClick={(e) => {
                                   e.preventDefault()
                                   inputRef.current.click()
                               }}
                        />
                        <div className="row mb-5 w-60" key="show-preview">
                            {photo && <div
                                className="d-flex align-items-start  col-md-3 m-3"
                                key="photo">
                                <img
                                    src={photo}
                                    alt="chosen"
                                    style={{height: "100%"}}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        window.open(article?.photo, '_blank')
                                    }}
                                />
                                <button className="btn" type="button"
                                        onClick={() => {
                                            dispatch(removeArticlePhoto())
                                        }}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>}
                        </div>
                        <label htmlFor="zag" className="m-2">Заголовок</label>
                        <input id="zag" name="header"
                               className="form-control"
                               placeholder="Заголовок"
                               type="text" value={article?.header}
                               autoFocus={true}
                               onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor="zag" className="m-2">Редактор контента</label>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            onChange={() => {
                                setArticle(prevState => ({
                                    ...prevState,
                                    body: editorRef.current.getContent()
                                }))
                            }}
                            initialValue="<p>Начните писать свою статью</p>"
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                    </div>
                    <Article article={{...article, photo}}/>
                    <button type="submit" className="btn btn-success m-4">
                        Опубликовать
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateArticle;
