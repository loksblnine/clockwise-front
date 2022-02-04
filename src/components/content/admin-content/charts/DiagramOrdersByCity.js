import React, {useEffect, useState} from 'react';
import {Pie, PieChart, Tooltip} from 'recharts';
import {instance} from "../../../../http/headerPlaceholder.instance";
import {datePattern} from "../../../../utils/constants";

const DiagramOrdersByCity = () => {
    const [data, setData] = useState([])
    const [to, setTo] = useState(new Date())
    const [from, setFrom] = useState(new Date());

    useEffect(() => {
        instance({
            url: `/charts/orders-city?to=${to}&from=${from}`,
            method: "get"
        }).then(({data}) => setData(data))
    }, [to, from])

    return (
        <div className="border border-dark rounded p-3 m-3">
            <h4>Количество заказов по городам (ТОП-3)</h4>
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
                <PieChart
                    width={500}
                    height={500}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <Tooltip/>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#094d74"
                        dataKey="value"
                        label={({
                                    cx,
                                    cy,
                                    midAngle,
                                    innerRadius,
                                    outerRadius,
                                    value,
                                    index
                                }) => {
                            const RADIAN = Math.PI / 180;
                            const radius = 25 + innerRadius + (outerRadius - innerRadius);
                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                            const y = cy + radius * Math.sin(-midAngle * RADIAN);

                            return (
                                <text
                                    color="red"
                                    x={x}
                                    y={y}
                                    fill="#094d74"
                                    textAnchor={x > cx ? "start" : "end"}
                                    dominantBaseline="central"
                                >
                                    {data[index].name} ({value})
                                </text>
                            );
                        }}
                    />
                </PieChart>
                : <p>Данных недостаточно</p>}
            <button className="btn btn-outline-secondary m-2" onClick={() => {
                setTo(new Date())
                setFrom(new Date())
            }}>Очистить данные
            </button>
        </div>
    );
};

export default DiagramOrdersByCity;
