import React from 'react';
import UserRow from "./UserRow";

const RenderUsersHavingPending = ({items}) => {
    if (!items) {
        return null;
    }
    return (
        <div>
            {items.map((el) => {
                return (
                    <UserRow item={el} key={`user-row-${el.user.id}`}/>
                );
            })}
        </div>
    );
};

export default RenderUsersHavingPending;