import React, {useEffect, useState} from 'react';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {instance} from "../../../../http/headerPlaceholder.instance";
import {handleMasterInput, masterIdsArrayToQueryString, objectToQueryString} from "../../../../utils/utils";
import {datePattern, WORK_TYPES} from "../../../../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {setMasters} from "../../../../store/actions/masterActions";
import {ARROWS_SVG} from "../../../../utils/svg_constants";
import {sortOrders} from "../../../../store/actions/orderActions";
import SetMarkDialog from "../../client-content/SetMarkDialog";

const DiagramMasterStats = () => {
    const dispatch = useDispatch()
    const masters = useSelector((state) => state.masters.items)
    const initSortParams = {
        money: '',
        count: '',
        ranking: ''
    }
    const [sortParams, setSortParams] = useState(initSortParams)
    const [data, setData] = useState([])
    const [mastersList, setMastersList] = useState([])
    const initialState = {
        master_name: "",
        master_id: -1,
        masters: [],
        work_id: "",
        from: '',
        to: '',
    }
    const [queryParams, setQueryParams] = useState(initialState);
    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setQueryParams(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    useEffect(() => {
        if (masters.length <= 0) {
            dispatch(setMasters(0))
        }
        if (queryParams.master_id.length) {
            instance({
                url: `/charts/order-master-table?${objectToQueryString(queryParams)}&${masterIdsArrayToQueryString(queryParams.masters)}`,
                method: "get"
            }).then(({data}) => setData(data))
        }
    }, [queryParams.master_id, queryParams.masters.length])
    const sortMasters = (type, str) => {
        setData(data.sort((i1, i2) => {
            if (i1[`${type}`] < i2[`${type}`]) {
                return (-1 * (str === "ASC" ? 1 : -1))
            }
            if (i1[`${type}`] > i2[`${type}`]) {
                return (1 * (str === "ASC" ? 1 : -1))
            }
            return 0
        }))
    }
    const handleSort = (e, paramName) => {
        e.preventDefault()
        switch (paramName) {
            case "Заработал, USD": {
                setSortParams(prevState => ({
                    money: prevState.money === "ASC" ? "DESC" : "ASC"
                }))
                sortMasters("Заработал USD", sortParams.money)
                break
            }
            case "Количество": {
                setSortParams(prevState => ({
                    count: prevState.count === "ASC" ? "DESC" : "ASC"
                }))
                sortMasters("Количество", sortParams.count)
                break
            }
            case "Рейтинг": {
                setSortParams(prevState => ({
                    ranking: prevState.ranking === "ASC" ? "DESC" : "ASC"
                }))
                sortMasters("Рейтинг", sortParams.ranking)
                break
            }
            default: {
                break
            }
        }
    }
    return (
        <div className="border border-dark rounded p-3 m-3">
            <h4>Сравнительный анализ мастеров</h4>
            <div className="form-group d-flex">
                <div className="col col-5">
                    <label className="text" htmlFor="date">Дата С</label>
                    <input type="date" id="date" name="from"
                           className="form-control react-datetime-range-picker"
                           key="date-from" required pattern={datePattern}
                           value={queryParams.from}
                           onChange={(e) => handleChange(e)}/>
                </div>
                <div className="col col-1">&nbsp;</div>
                <div className="col col-5">
                    <label className="text" htmlFor="date">По</label>
                    <input type="date" id="date" name="to"
                           className="form-control react-datetime-range-picker"
                           min={queryParams.from}
                           key="date-from" required pattern={datePattern}
                           value={queryParams.to}
                           onChange={(e) => handleChange(e)}/>
                </div>
            </div>
            <div className="form-group">
                <label>Выбрать мастера</label>
                <input className="form-control" list="datalistOptions" name="master_id" autoComplete="on"
                       type="text" value={queryParams.master_name}
                       placeholder="Type to search..."
                       onChange={(e) => handleMasterInput(e, setQueryParams, setMastersList, dispatch)}
                />
                <datalist id="datalistOptions">
                    <option key="1" value="">---Выбрать мастера---</option>
                    {mastersList?.map(master => {
                        return (
                            <option key={master.master_id}
                                    value={master.master_id + "|" + master.master_name}
                            />
                        )
                    })}
                </datalist>
                <div className="d-flex justify-content-around">
                    {
                        queryParams.masters.map(id => {
                            return (
                                <div className="m-2" key={id}>
                                    <p>{masters.filter(m => Number(m.master_id) === Number(id))[0]?.master_name} &nbsp;
                                        <button className="btn btn-outline-dark" onClick={() => {
                                            setQueryParams(prevState => ({
                                                ...prevState,
                                                masters: prevState.masters.filter(elem => elem !== id)
                                            }))
                                        }}>x
                                        </button>
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="m-2">
                <h2 className="text-left mt-5">Ваш список заказов</h2>
                {data.length && <table className="table mt-5 text-justify">
                    <thead>
                    <tr>
                        <th scope="col">Имя мастера</th>
                        <th scope="col" onClick={(e) => handleSort(e, "Заработал, USD")}> Заработал
                            денег {sortParams.money === "ASC" ? ARROWS_SVG.ASC : ARROWS_SVG.DESC}</th>
                        <th scope="col" onClick={(e) => handleSort(e, "Количество")}> Количество
                            заказов {sortParams.count === "ASC" ? ARROWS_SVG.ASC : ARROWS_SVG.DESC}</th>
                        <th scope="col"> Завершил</th>
                        <th scope="col"> Ждут выполнения</th>
                        <th scope="col">Маленькие часы</th>
                        <th scope="col">Средние часы</th>
                        <th scope="col">Большие часы</th>
                        <th scope="col" onClick={(e) => handleSort(e, "Рейтинг")}>Рейтинг
                            {sortParams.ranking === "ASC" ? ARROWS_SVG.ASC : ARROWS_SVG.DESC}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.map(d => (
                        <tr key={d["Количество"]}>
                            <th scope="row"> {d["Мастер"]}</th>
                            <th scope="row"> {d["Заработал USD"]}</th>
                            <th scope="row"> {d["Количество"]}</th>
                            <th scope="row"> {d["Завершенные"]}</th>
                            <th scope="row"> {d["Ждут выполнения"]}</th>
                            <th scope="row"> {d["Маленькие часы"]}</th>
                            <th scope="row"> {d["Средние часы"]}</th>
                            <th scope="row"> {d["Большие часы"]}</th>
                            <th scope="row"> {d["Рейтинг"]}</th>
                        </tr>
                    ))}
                    </tbody>
                </table>}
            </div>
            <div className="m-2">
                <BarChart
                    width={500}
                    height={400}
                    data={data}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar className="d-none" dataKey="Мастер"/>
                    <Bar dataKey="Заработал USD" fill="#094d74"/>
                    <Bar dataKey="Количество" fill="#759cd8"/>
                    <Bar dataKey="Завершенные" fill="#9cb9d1"/>
                    <Bar dataKey="Ждут выполнения" fill="#9cb9d1"/>
                </BarChart>
            </div>
            <div className="m-2">
                <BarChart
                    width={500}
                    height={400}
                    data={data}
                >
                    <CartesianGrid strokeDasharray="30 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar className="d-none" dataKey="Мастер"/>
                    <Bar dataKey="Количество" fill="#759cd8"/>
                    <Bar dataKey="Маленькие часы" fill="#9cb9d1"/>
                    <Bar dataKey="Средние часы" fill="#9cb9d1"/>
                    <Bar dataKey="Большие часы" fill="#9cb9d1"/>
                </BarChart>
            </div>
            <div className="m-2">
                <BarChart
                    width={500}
                    height={400}
                    data={data}
                >
                    <CartesianGrid strokeDasharray="1 1"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar className="d-none" dataKey="Мастер"/>
                    <Bar dataKey="Рейтинг" fill="#77bdb3"/>
                </BarChart>
            </div>
            <button className="btn btn-outline-secondary m-2" onClick={() => {
                setQueryParams(initialState)
            }}>Очистить данные
            </button>
        </div>
    );
};

export default DiagramMasterStats;
