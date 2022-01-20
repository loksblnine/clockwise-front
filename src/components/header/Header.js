import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import * as constants from "../../utils/constants";
import './Header.css'
import imageSrc from "../../images/logo.png"

const Logo = () => {
    const history = useHistory()
    const handleClick = () => {
        history.push('/')
    }
    return (
        <div>
            <Nav.Link>
                <img title="Вернуться к заказам" src={imageSrc} alt="my-img" onClick={e => handleClick(e)}/>
            </Nav.Link>
        </div>
    )
}

const Header = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.users.user)
    const letItSnow = useSelector(state => state.weather.letItSnow)
    const logOut = () => {
        dispatch({
            type: constants.ACTIONS.USER.LOG_OUT
        })
        history.push(
            {pathname: '/'}
        )
    }

    const handleAccess = () => {
        history.push(
            {pathname: constants.PATH[user.role]}
        )
    }

    return (
        <Navbar>
            <Container>
                <Logo/>
                {(user.role > 0) ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <button type="button" className="btn btn-xl" id="weather"
                                onClick={(e) => {
                                    e.preventDefault()
                                    dispatch({
                                        type: constants.ACTIONS.WEATHER.SET_WINTER,
                                        payload: !letItSnow
                                    })
                                }}
                        >{letItSnow ? "Зима" : "Лето"}
                        </button>
                        <button onClick={() => history.push('/blog')}
                                className="btn btn-xl"
                        >
                            Блог
                        </button>
                        <button
                            onClick={handleAccess}
                            className="btn btn-xl"
                        >
                            Панель
                        </button>
                        <button
                            onClick={() => logOut()}
                            className="btn btn-xl"
                        >
                            Выйти
                        </button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <button type="button" className="btn btn-xl" data-toggle="toggle" id="weather"
                                onClick={(e) => {
                                    e.preventDefault()
                                    dispatch({
                                        type: constants.ACTIONS.WEATHER.SET_WINTER,
                                        payload: !letItSnow
                                    })
                                }}
                        >{letItSnow ? "Зима" : "Лето"}
                        </button>
                        <button className="btn btn-xl"
                                onClick={() => history.push('/blog')}
                        >
                            Блог
                        </button>
                        <button className="btn btn-xl"
                                onClick={() => history.push('/login')}
                        >
                            Авторизация
                        </button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
}

export default Header
