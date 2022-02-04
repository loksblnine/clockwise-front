import {ACTIONS, SERVER_URL} from "./constants";
import {saveAs} from "file-saver";
import {instance} from "../http/headerPlaceholder.instance";

export const objectToQueryString = (object) => {
    let string = ""
    if (object?.work_id?.length > 0) {
        string += (`&work_id=${object?.work_id}`)
    }
    if (object?.isDone?.length > 0) {
        string += (`&isDone=${object?.isDone}`)
    }
    if (object?.master_id?.length > 0) {
        if (Number(object.master_id) > 0)
            string += (`&master_id=${object?.master_id}`)
    }
    if (object?.from?.length > 0) {
        string += (`&from=${object?.from}`)
    }
    if (object?.to?.length > 0) {
        string += (`&to=${object?.to}`)
    }
    return string
}

export const hasNumber = (myString) => {
    return /\d/.test(myString);
}
export const saveExcelFile = (queryParams, token) => {
    saveAs(
        `${SERVER_URL}/download/excel?${objectToQueryString(queryParams)}&token=${token}`,
        "Отчёт.xlsx"
    );
};
export const savePDFile = (id, token) => {
    saveAs(
        `${SERVER_URL}/download/pdf/${id}?token=${token}`,
        `Чек${id}.pdf`
    );
};
export const handleMasterInput = (e, setQueryParams, setMastersList, dispatch) => {
    e.preventDefault()
    const {name, value} = e.target;
    if (!hasNumber(value)) {
        instance({
            method: "get",
            url: `masters/offset/0?name=${value}`
        }).then(({data}) => {
                setMastersList(data)
                dispatch({
                    type: ACTIONS.MASTERS.ADD_MASTERS_ARRAY,
                    payload: data
                })
            }
        )
        setQueryParams(prevState => ({
            ...prevState,
            [name]: "",
            master_name: value
        }))
    } else {
        setQueryParams(prevState => ({
            ...prevState,
            [name]: value.split("|")[0],
            master_name: value.split("|")[1],
            masters: [...prevState.masters, value.split("|")[0]]
        }))
        setQueryParams(prevState => ({
            ...prevState,
            masters: prevState.masters.sort().filter(function (item, pos, ary) {
                return !pos || item != ary[pos - 1];
            })
        }))
        e.target.value = value.replace(/[0-9|]/g, '')
    }
}
