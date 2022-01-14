import React, {useRef, useState} from 'react';
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {Editor} from '@tinymce/tinymce-react';
import {updateArticle} from "../../../../store/actions/blogActions";
import {useHistory, useLocation, withRouter} from "react-router-dom";

const EditArticle = () => {
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const editorRef = useRef(null);
    const location = useLocation()
    const history = useHistory()
    const [article, setArticle] = useState(location.state)

    const handleChooseFile = (e) => {
        if (e.target?.files[0]?.type.split('/')[0] === "image") {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                setArticle(prevState => ({
                    ...prevState,
                    photo: reader.result
                }));
                e.target.value = ""
            };
        } else {
            toast.info("Только фотографии")
        }
    }
    const handleBack = () => {
        history.push({
            pathname: '/blog',
        })
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
                dispatch(updateArticle({...article, body: editorRef.current.getContent()}, article.article_id))
                history.push('/blog')
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
                               value={article?.photo ? "Добавить фото..." : "Изменить фото"}
                               onClick={(e) => {
                                   e.preventDefault()
                                   inputRef.current.click()
                               }}
                        />
                        <div className="row mb-5 w-60" key="show-preview">
                            {article?.photo && <div
                                className="d-flex align-items-start  col-md-3 m-3"
                                key="photo">
                                <img
                                    src={article?.photo}
                                    alt="chosen"
                                    style={{width: "100%"}}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        window.open(article?.photo, '_blank')
                                    }}
                                />
                                <button className="btn" type="button"
                                        onClick={() => {
                                            setArticle(prevState => ({
                                                ...prevState,
                                                photo: ""
                                            }));
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
                            initialValue={article?.body}
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
                    <button type="submit" className="btn btn-success m-4">
                        Изменить
                    </button>
                    <button className="btn btn-primary m-1" onClick={handleBack}>
                        Отмена
                    </button>

                </div>
            </form>
        </div>
    );
};

export default withRouter(EditArticle);
