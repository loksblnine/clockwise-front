import React, {useEffect, useState, ReactElement} from 'react'
import Button from "@material-ui/core/Button";
import {useLocation} from "react-router-dom";
import imageSrc from "../../images/logo.png"
import './header.css'

function ButtonLogin() {
    return (
        <div className={`header-button`}>
            <a href={'/'}>
                <button className="btn my-2 my-sm-0">К заказам</button>
            </a>
        </div>
    )
}

function ButtonAccessSucceed() {
    return (
        <div className={`header-button`}>
            <a href={'/'}>
                <button className="btn my-2 my-sm-0">Выход</button>
            </a>
        </div>
    )
}

function ButtonUnauthorisedUser() {
    return (
        <div className={`header-button`}>
            <a href={'/login'}>
                <button className="btn my-2 my-sm-0">Вход</button>
            </a>
        </div>
    )
}

function Header(props) {
    const location = useLocation()
    return (
        <div className="header">
            <div>
                <img title="my-img" src={imageSrc} alt="my-img"/>
            </div>
            {location.pathname === '/login'
                ? <ButtonLogin/>
                : location.pathname !== '/access_succeed'
                    ? <ButtonUnauthorisedUser/>
                    : <ButtonAccessSucceed/>
            }

        </div>
    );
}

export default Header