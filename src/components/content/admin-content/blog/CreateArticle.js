import React, {useRef, useState} from 'react';
import {toast} from "react-toastify";

const CreateArticle = () => {
    const handleChooseFile = (e) => {
        if (e.target?.files[0]?.type.split('/')[0] === "image") {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                setArticle(prevState => ({
                    ...prevState,
                    photo: reader.result
                }))
                console.log(article)
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
    const inputRef = useRef(null)
    const initArticle = {
        photo: "",
        body: "<div><p>",
        header: ""
    }
    const [article, setArticle] = useState(initArticle)
    return (
        <div className="router">
            <form>
                <div className="m-4">
                    <div className="form-group">
                        <label>Фото статьи</label>
                        <input type="file" className="d-none"
                               id="file-input" key="file-input"
                               accept="image/*" ref={inputRef}

                               onChange={event => handleChooseFile(event)}/>
                        <input type="text" className="form-control" readOnly
                               value="Добавить фото..." id="file-input" key="file-input"
                               onClick={(e) => {
                                   e.preventDefault()
                                   inputRef.current.click()
                               }}
                        />
                        <label htmlFor="zag">Заголовок</label>
                        <input id="zag"
                               className="form-control"
                               placeholder="Заголовок"
                               type="text"
                               autoFocus={true}
                        />
                        <textarea
                            className="form-control"
                            placeholder="Tell your story..."
                            autoFocus={true}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-success">
                    Publish
                </button>
            </form>
        </div>
    );
};

export default CreateArticle;
