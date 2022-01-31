import React from 'react';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";

const Diagram4 = () => {
    const data =
        [{
            "name": "Мастер 1",
            "orderCount": "40",
            "type1": "10",
            "type2": "0",
            "type3": "4",
            "earnings": "100.6"
        }]

    return (
        <div>
            <p>{data[0].name}</p>
            <BarChart
                width={730}
                height={400}
                data={data}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="earnings" fill="#094d74"/>
                <Bar dataKey="orderCount" fill="#759cd8"/>
                <Bar dataKey="type1" fill="#9cb9d1"/>
                <Bar dataKey="type2" fill="#9cb9d1"/>
                <Bar dataKey="type3" fill="#9cb9d1"/>
            </BarChart>
        </div>
    );
};

export default Diagram4;
