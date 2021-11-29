import React, {useContext} from 'react'
import imageSrc from "../../images/logo.png"
import './Header.css'
import {Context} from "../../index";
import {observer} from 'mobx-react-lite'
import {useHistory} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

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

const Header = observer((props) => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        history.push(
            {pathname: '/'}
        )
        localStorage.removeItem('token')
    }
    const handleAdminAccess = () => {
        history.push(
            {pathname: '/access_succeed'}
        )
    }

    return (
        <Navbar variant="dark">
            <Container>
                <Logo/>
                {(user.isAuth) ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <button
                            onClick={handleAdminAccess}
                            className="btn btn-xl"
                        >
                            Админ панель
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
                        <button className="btn btn-xl" onClick={() => history.push('/login')}>Авторизация</button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default Header