import React from 'react';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";

const ChartMenu = () => {
    const data = [
        {
            date: new Date().toLocaleDateString(),
            count: 100
        },
        {
            date: new Date().toLocaleDateString(),
            count: 50
        },
        {
            date: new Date().toLocaleDateString(),
            count: 10
        }
    ];

    return (
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="date"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey="count" fill="#f4c430"/>
        </BarChart>
    );
};

export default ChartMenu;
