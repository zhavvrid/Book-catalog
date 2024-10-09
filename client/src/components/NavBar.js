import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, CONTACT_ROUTE, SHOP_ROUTE, ABOUT_ROUTE, PROFILE_ROUTE } from "../utils/consts";
import { Button, Modal } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { FaShoppingCart } from 'react-icons/fa';
import "../index.css"
import Order from "./Order"
import { fetchAllUsersWithOrders } from '../http/userAPI';

const showNothing = () => {
    return (<div className='empty'>
        <h2>Товаров нет</h2>
    </div>)
}

const NavBar = observer(({ orders }) => {

    orders.getOrders().forEach(order => {
        const orderId = order.id;
        const clientId = order.userId;
        console.log("ID заказа:", orderId);
        console.log("ID клиента:", clientId);
        const bookInfo = order.book;
        console.log("Информация о книге в заказе:", bookInfo.title, bookInfo.price);
    })
    const { user, order } = useContext(Context);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [usersData, setUsersData] = useState([]);
    
console.log('USER',user.user.id)
    useEffect(() => {
        const fetchUsersAndOrders = async () => {
            try {
                setLoading(true);
                const users = await fetchAllUsersWithOrders();
                const filteredUsers = users.filter(user => user.role === 'USER');
                setUsersData(filteredUsers);
            } catch (error) {
                console.error('Ошибка при загрузке пользователей и их заказов:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsersAndOrders();
    }, []);

    const goToProfile = (userId) => {
        navigate(`/profile/${userId}`);
    };

    const validate = () => {
        let errors = {};
        if (!/^\d{16}$/.test(cardNumber)) {
            errors.cardNumber = 'Номер карты должен содержать 16 цифр.';
        }
        if (!/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(expiryDate)) {
            errors.expiryDate = 'Неправильный формат срока действия. Используйте MM/YY.';
        }
        if (!/^\d{3}$/.test(cvv)) {
            errors.cvv = 'CVV должен содержать 3 цифры.';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            order.clearCart();
            setShowModal(false);
        }
    };

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
 
    const showOrders = (orders) => {
        let summa = 0
        orders.getOrders().forEach(order => summa += order.book.price)
        return (<div>  {orders.getOrders().map(order => (
            <Order key={order.id} item={order.book} orderId={order.id} />
        ))}
            <div className='summa'><p>Итого: {summa}$ </p>
                <Button style={{ marginLeft: '20px', backgroundColor: '#212121', borderColor: '#089da1' }} onClick={() => setShowModal(true)}>Оплатить</Button>
            </div>
        </div>)
    }

    let [cartOpen, setCartOpen] = useState(false)
    return (
        <>
            <Navbar bg="light" variant="light" style={{ boxShadow: '0 0 10px #089da1', position: 'fixed', top: '0', width: '100%', zIndex: '1000' }}>
                <Container>
                    <NavLink style={{ color: 'black', display: 'flex', alignItems: 'center', fontWeight: 'bold' }} to={SHOP_ROUTE}>BookStore</NavLink>
                    <NavLink className="nav-link" style={{ cursor: 'pointer' }} onClick={handleCatalogClick}>Каталог</NavLink>
                    <NavLink className="nav-link" to={CONTACT_ROUTE} >Контакты</NavLink>
                    <NavLink className="nav-link" to={ABOUT_ROUTE}>О нас</NavLink>
                    {user.isAuth ? (
                        <>
                            <FaShoppingCart onClick={() => setCartOpen(cartOpen = !cartOpen)} className={`shop-button ${cartOpen && 'active'}`} />
                            {cartOpen && (
                                <div className='shop-cart'>
                                    {orders.getOrders().length > 0 ? showOrders(orders) : showNothing()}
                                </div>
                            )}
                            <Nav className="ml-auto" style={{ color: 'black' }}>
                                <Button variant={"outline-dark"} onClick={() => goToProfile(user.user.id)}>Личный кабинет</Button>
                                <Button variant={"outline-dark"} onClick={() => logOut()} className="ml-2">Выйти</Button>
                            </Nav>
                        </>
                    ) : (
                        <Nav className="ml-auto" style={{ color: 'white' }}>
                            <Button variant={"outline-dark"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                        </Nav>
                    )}
                </Container>
            </Navbar>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Оплата</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Введите данные для оплаты:</p>
                    <input
                        type="text"
                        placeholder="Номер карты"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                    />
                    {errors.cardNumber && <p style={{ color: 'red' }}>{errors.cardNumber}</p>}
                    <input
                        type="text"
                        placeholder="Срок действия"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                    />
                    {errors.expiryDate && <p style={{ color: 'red' }}>{errors.expiryDate}</p>}
                    <input
                        type="text"
                        placeholder="CVV"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                    />
                    {errors.cvv && <p style={{ color: 'red' }}>{errors.cvv}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Закрыть</Button>
                    <Button style={{ backgroundColor: "#089da1", borderColor: '#089da1', color: 'black' }} onClick={handleSubmit}>Оплатить</Button>
                </Modal.Footer>
            </Modal>
        </>
    );

});

export default NavBar;
