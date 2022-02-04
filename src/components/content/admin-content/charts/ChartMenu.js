import React from 'react';
import DiagramByDays from "./DiagramByDays";
import DiagramMasterStats from "./DiagramMasterStats";
import DiagramOrdersByMaster from "./DiagramOrdersByMaster";
import DiagramOrdersByCity from "./DiagramOrdersByCity";

const ChartMenu = () => {
    return (
        <div>
            <DiagramByDays/>
            <DiagramOrdersByCity/>
            <DiagramOrdersByMaster/>
            <DiagramMasterStats/>
        </div>
    );
};

export default ChartMenu;
