import React, {useContext} from 'react'
import {Button} from "@material-ui/core";
import imageSrc from "../../images/logo.png"
import './Header.css'
import {Context} from "../../index";
import {observer} from 'mobx-react-lite'
import {useHistory} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const Logo = () => {
    return (
        <div>
            <a href={'/'}>
                <img title="my-img" src={imageSrc} alt="my-img"/>
            </a>
        </div>
    )
}

const Header = observer((props) => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar variant="dark">
            <Container>
                <Logo/>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push('/access_succeed')}
                            className={`header-button`}
                        >
                            Админ панель
                        </Button>

                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>

                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history.push('/login')}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default Header