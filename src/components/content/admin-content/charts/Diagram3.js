import React from 'react';
import {Legend, Pie, PieChart, Tooltip} from 'recharts';

const Diagram3 = () => {
    const data = [
        {
            "name": "Мастер1",
            "value": 40
        },
        {
            "name": "Мастер 2",
            "value": 43
        },
        {
            "name": "Мастер 3",
            "value": 30
        },
        {
            "name": "Другие",
            "value": 200
        }
    ];

    return (
        <div>
            <PieChart
                width={400}
                height={400}
            >
                <Tooltip/>

            </PieChart>
        </div>
    );
};

export default Diagram3;
