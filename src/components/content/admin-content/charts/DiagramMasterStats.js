import React, {useEffect, useState} from 'react';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {instance} from "../../../../http/headerPlaceholder.instance";
import {handleMasterInput, objectToQueryString} from "../../../../utils/utils";
import {datePattern} from "../../../../utils/constants";

const DiagramMasterStats = () => {
    const [data, setData] = useState([])
    const [mastersList, setMastersList] = useState([])
    const initialState = {
        master_name: "",
        master_id: -1,
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
        if(queryParams.master_id.length) {
            instance({
                url: `/charts/4?${objectToQueryString(queryParams)}`,
                method: "get"
            }).then(({data}) => setData(data))
        }
    }, [queryParams.master_id])
    return (
        <div className="border border-dark rounded p-3 m-3">
            <h4>Персональный анализ мастера</h4>
            <div className="form-group d-flex">
                <div className="col col-5">
                    <label className="text" htmlFor="date">Дата С</label>
                    <input type="date" id="date" name="from"
                           className="form-control react-datetime-range-picker"
                           key="date-from" required pattern={datePattern}
                           value={queryParams.from}
                           onChange={(e)=>handleChange(e)}/>
                </div>
                <div className="col col-1">&nbsp;</div>
                <div className="col col-5">
                    <label className="text" htmlFor="date">По</label>
                    <input type="date" id="date" name="to"
                           className="form-control react-datetime-range-picker"
                           min={queryParams.from}
                           key="date-from" required pattern={datePattern}
                           value={queryParams.to}
                           onChange={(e)=>handleChange(e)}/>
                </div>
            </div>
            <div className="form-group">
                <label>Выбрать мастера</label>
                <input className="form-control" list="datalistOptions" name="master_id" autoComplete="on"
                       type="text" value={queryParams.master_name}
                       placeholder="Type to search..." onChange={(e) => handleMasterInput(e, setQueryParams, setMastersList)}
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
            </div>
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
                <Bar dataKey="Заработал" fill="#094d74"/>
                <Bar dataKey="Количество" fill="#759cd8"/>
                <Bar dataKey="Тип1" fill="#9cb9d1"/>
                <Bar dataKey="Тип2" fill="#9cb9d1"/>
                <Bar dataKey="Тип3" fill="#9cb9d1"/>
            </BarChart>
            <button className="btn btn-outline-secondary m-2" onClick={() => {
                setQueryParams(initialState)
            }}>Очистить данные
            </button>
        </div>
    );
};

export default DiagramMasterStats;
