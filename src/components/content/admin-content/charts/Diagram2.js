import React from 'react';
import {Pie, PieChart} from 'recharts';

const ChartMenu = () => {
    const data = [
        {
            "name": "Днепр",
            "value": 40
        },
        {
            "name": "Ужгород",
            "value": 15
        },
        {
            "name": "Торонто",
            "value": 3
        },
        {
            "name": "Другое",
            "value": 2
        }
    ];

    return (
        <div>
            <PieChart
                width={500}
                height={500}
            >
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#759cd8"
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
                                fill="#8884d8"
                                textAnchor={x > cx ? "start" : "end"}
                                dominantBaseline="central"
                            >
                                {data[index].name} ({value})
                            </text>
                        );
                    }}
                />
                <Pie
                    data={data}
                    cx="100%"
                    cy="50%"
                    outerRadius={100}
                    fill="#759cd8"
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
                                x={x}
                                y={y}
                                fill="#8884d8"
                                textAnchor={x > cx ? "start" : "end"}
                                dominantBaseline="central"
                            >
                                {data[index].name} ({value})
                            </text>
                        );
                    }}
                />
            </PieChart>
        </div>
    );
};

export default ChartMenu;
