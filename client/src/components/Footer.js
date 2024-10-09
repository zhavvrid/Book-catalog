import React, { useContext, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { FaPhone, FaEnvelopeOpen, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import "../index.css";

const Footer = observer(() => {
    const { book } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true); 
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmitReview = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            setShowModal(true);
            setIsValidEmail(true);
            setErrorMessage('');
        } else {
            setIsValidEmail(false);
            setErrorMessage('Введите корректный e-mail.');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <div className="footer_main">
                <div className="tag">
                    <h1>Интернет-магазин</h1>
                    <NavLink to="/catalog">Каталог</NavLink>
                    <NavLink to="/contacts">Контакты</NavLink>
                    <NavLink to="/about">О нас</NavLink>
                </div>
                <div className="tag">
                    <h1>Контакты</h1>
                    <a href="#"><FaPhone /> +375 44 588 48 06</a>
                    <a href="#"><FaPhone /> +375 29 315 88 25</a>
                    <a href="#"><FaEnvelopeOpen /> bookstore123@gmail.com</a>
                </div>
                <div className='tag'>
                    <h1>Подпишись на нас</h1>
                    <div className="social_links">
                        <a href="https://www.instagram.com/" className="social_link">
                            <FaInstagram size={25} />
                        </a>
                        <a href="https://www.facebook.com/" className="social_link">
                            <FaFacebook size={25} />
                        </a>
                        <a href="https://www.tiktok.com/" className="social_link">
                            <FaTiktok size={25} />
                        </a>
                    </div>
                </div>
                <div className="tag">
                    <h1>Рассылка</h1>
                    <div className="search_bar">
                        <input 
                            type="email" 
                            placeholder="Ваш e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            className={!isValidEmail ? 'invalid' : ''} 
                        />
                        <Button onClick={handleSubmitReview}>Подписаться</Button>
                        {!isValidEmail && <p className="error-message">{errorMessage}</p>}
                        <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton></Modal.Header>
                            <Modal.Body>
                                Подтвердите ваш e-mail, перейдя по ссылке в письме, отправленном на почту.
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Footer;
