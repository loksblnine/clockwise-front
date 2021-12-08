import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addMaster} from "../../../../store/actions/masterActions";

const InputMaster = () => {
    const [master_name, setMasterName] = useState("")
    const [email, setEmail] = useState("")
    const [ranking, setRanking] = useState("")

    const dispatch = useDispatch()
    const inputRef = React.useRef(null)

    const onSubmitForm = async e => {
        e.preventDefault();
        const body = {master_name, email, ranking: Number(ranking)}
        dispatch(addMaster(body))
        inputRef.current.click()
    }
    return (
        <div>
            <button type="button" className="btn btn-success mb-5" data-toggle="modal"
                    data-target="#addMaster">
                Добавить
            </button>
            <div className="modal fade" id="addMaster" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={event => onSubmitForm(event)}>
                            <div className="modal-header">
                                <h2 className="modal-title" id="exampleModalLabel">Добавить мастера</h2>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="name">ФИО мастера</label>
                                <input className="form-control" placeholder="Иван Иванович Иванов" value={master_name}
                                       name="name" onChange={e => setMasterName(e.target.value)}
                                       required pattern="[A-ZА-Яa-zа-я -]+"
                                />
                                <label htmlFor="email">e-mail</label>
                                <input className="form-control" value={email} name="email" type="email"
                                       onChange={e => setEmail(e.target.value)}
                                       required
                                       pattern="[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+"
                                />
                                <label htmlFor="rating">Рейтинг</label>
                                <input className="form-control" placeholder="5.0" value={ranking} name="ranking"
                                       onChange={e => setRanking(e.target.value)}
                                       required pattern="([1-5])|([1-4].[05])|(5.0)"
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                        ref={inputRef}>Закрыть
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Сохранить изменения
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default InputMaster;