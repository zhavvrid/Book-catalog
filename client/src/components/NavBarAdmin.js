import React, { useContext, useState} from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, CONTACT_ROUTE, SHOP_ROUTE, ABOUT_ROUTE} from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate} from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import "../index.css"
import Order from "./Order"
import {BookList} from "./BookList"

const showOrders = (orders) =>{
    let summa = 0
    orders.getOrders().forEach(order=>summa += order.book.price)
    return (<div>  {orders.getOrders().map(order => (
        <Order key={order.id} item={order.book} orderId={order.id} />
    ))} 
    <p className='summa'>Итого: {summa}$</p>
    </div>)
}

const showNothing = () => {
    return (<div className='empty'>
        <h2>Товаров нет</h2>
    </div>)
}

const NavBarAdmin = observer(({ orders }) => {
    orders.getOrders().forEach(order => {
        const orderId = order.id; 
        const clientId = order.userId; 
        console.log("ID заказа:", orderId);
        console.log("ID клиента:", clientId);
        const bookInfo = order.book;
        console.log("Информация о книге в заказе:", bookInfo.title, bookInfo.price); 
    })
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    }
    const handleCatalogClick = () => {
        const bookListElement = document.getElementById('bookList');
        if (bookListElement) {
            bookListElement.scrollIntoView({ behavior: "smooth" });
        }
    };

let [cartOpen, setCartOpen] = useState(false)
    return (
        <Navbar bg="light" variant="light"  style={{ boxShadow: '0 0 10px #089da1', position: 'fixed', top:'0', width: '100%', zIndex: '1000' }}>
            <Container>
                <NavLink style={{ color: 'black', display: 'flex', alignItems: 'center',fontWeight:'bold' }} to={SHOP_ROUTE}>BookStore</NavLink>
                <NavLink className="nav-link" style={{ cursor: 'pointer' }} onClick={handleCatalogClick}>Каталог</NavLink>
            <NavLink className="nav-link" to={CONTACT_ROUTE} >Контакты</NavLink>
            <NavLink className="nav-link" to={ABOUT_ROUTE}>О нас</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{ color: 'black' }}>
                        
                        <Button
                            variant={"outline-dark"}
                            onClick={() => navigate(ADMIN_ROUTE)} 
                        >
                            Админ панель
                        </Button>
                        <Button
                            variant={"outline-dark"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant={"outline-dark"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );

});

export default NavBarAdmin;
