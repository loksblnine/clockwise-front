import React, {useRef, useState} from 'react';
import {toast} from "react-toastify";
import {removePhoto, setPhotos} from "../../../../store/actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import Article from "../../customer-content/Blog/Article";
import {instance} from "../../../../http/headerPlaceholder.instance";

const CreateArticle = () => {
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const photo = useSelector((state) => state.users.photo)
    const [bold, setBold] = useState(false)
    const [italic, setItalic] = useState(false)
    const initArticle = {
        body: "<div><p>",
        header: ""
    }
    const [article, setArticle] = useState(initArticle)
    const handleChooseFile = (e) => {
        if (e.target?.files[0]?.type.split('/')[0] === "image") {
            if (photo.length) dispatch(removePhoto(0))
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                dispatch(setPhotos(reader.result))
            };
        } else {
            toast.info("Только фотографии")
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
        <div className="router">
            <form onSubmit={() => {
                setArticle((prevState => {
                    return ({
                        ...prevState,
                        body: article?.body?.concat("</p></div>")
                    })
                }))
                instance({
                    url: "/blog",
                    data: {
                        ...article,
                        photo
                    },
                    method: "post",
                })
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
                            {
                                photo?.length > 0 &&
                                photo.map((item, i) => {
                                    return (
                                        <div
                                            className={`d-flex align-items-start  col-md-3 m-3`}
                                            key={i}>
                                            <img
                                                src={item}
                                                alt="chosen"
                                            />
                                            <button className="btn" type="button"
                                                    onClick={() => {
                                                        dispatch(removePhoto(0))
                                                    }}
                                            >
                                                <span>&times;</span>
                                            </button>
                                        </div>
                                    )
                                })
                            }
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
                        <button type="button" className="btn btn-outline-success m-4"
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (bold) {
                                        setArticle((prevState => {
                                            return ({
                                                ...prevState,
                                                body: article?.body?.concat("</b>")
                                            })
                                        }))
                                        setBold(!bold)
                                    } else {
                                        setArticle((prevState => {
                                            return ({
                                                ...prevState,
                                                body: article?.body?.concat("<b>")
                                            })
                                        }))
                                        setBold(!bold)
                                    }
                                }}
                        >
                            Жирный)
                        </button>
                        <button type="button" className="btn btn-outline-success m-4"
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (italic) {
                                        setArticle((prevState => {
                                            return ({
                                                ...prevState,
                                                body: article?.body?.concat("</i>")
                                            })
                                        }))
                                        setItalic(!italic)
                                    } else {
                                        setArticle((prevState => {
                                            return ({
                                                ...prevState,
                                                body: article?.body?.concat("<i>")
                                            })
                                        }))
                                        setItalic(!italic)
                                    }
                                }}
                        >
                            Курсив
                        </button>
                        <button type="button" className="btn btn-outline-success m-4"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setArticle((prevState => {
                                        return ({
                                            ...prevState,
                                            body: article?.body?.concat("</p><p>")
                                        })
                                    }))
                                }}
                        >
                            Добавить абзац
                        </button>
                        <textarea
                            className="form-control"
                            placeholder="Tell your story..."
                            autoFocus={true}
                            name="body" value={article?.body}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>
                <Article article={{...article, photo}}/>
                <button type="submit" className="btn btn-success m-4">
                    Опубликовать
                </button>
            </form>
        </div>
    );
};

export default CreateArticle;
