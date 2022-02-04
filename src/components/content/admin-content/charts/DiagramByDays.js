import React, {useEffect, useState} from 'react';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {instance} from "../../../../http/headerPlaceholder.instance";
import {datePattern} from "../../../../utils/constants";

const DiagramByDays = () => {
    const [data, setData] = useState([])
    const [to, setTo] = useState(new Date())
    const [from, setFrom] = useState(new Date());

    useEffect(() => {
        instance({
            url: `/charts/1?to=${to}&from=${from}`,
            method: "get"
        }).then(({data}) => setData(data))
    }, [to, from])

    return (
        <div className="border border-dark rounded p-3 m-3">
            <h4>Анализ количества заказов по дням</h4>
            <div className="form-group d-flex">
                <div className="col col-5">
                    <label className="text" htmlFor="date">Дата С</label>
                    <input type="date" id="date" name="from"
                           className="form-control react-datetime-range-picker"
                           key="date-from" required pattern={datePattern}
                           value={from}
                           onChange={(e) => setFrom(e.target.value)}/>
                </div>
                <div className="col col-1">&nbsp;</div>
                <div className="col col-5">
                    <label className="text" htmlFor="date">По</label>
                    <input type="date" id="date" name="to"
                           className="form-control react-datetime-range-picker"
                           min={from}
                           key="date-from" required pattern={datePattern}
                           value={to}
                           onChange={(e) => setTo(e.target.value)}/>
                </div>
            </div>
            {data.length > 1 ?
                <BarChart
                    data={data}
                    width={500}
                    height={500}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="Количество" fill="#094d74"/>
                </BarChart>
                : <p>Данных недостаточно</p>
            }
            <button className="btn btn-outline-secondary m-2" onClick={() => {
                setTo(new Date())
                setFrom(new Date())
            }}>Очистить данные
            </button>
        </div>
    );
};

export default DiagramByDays;
