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
