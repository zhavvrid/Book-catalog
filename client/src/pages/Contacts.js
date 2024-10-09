import React from 'react';
import { Container} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import "../index.css";
import Footer from '../components/Footer'
import Feedback from '../components/Feedback'

const Contacts = observer(() => {
    return (
        <>
            <Container>
                <div id="contacts">
                    <h2 style={{ textAlign: 'center' }}>Контактная информация</h2>
                    <div className="pageblock">
                        <p className="text">Наши сотрудники всегда рады
                            ответить на возникшие вопросы. Работает бесплатный для всей Беларуси номер <br></br> А1: <a
                                href="tel:+375 (29) 113-0123">+375 (29) 113-0123; </a> МТС: <a href="tel:+375297710123">+375 (29)
                                771-0123</a>. Звоните!</p>
                        <p className="text">Приём заказов и вопросов - круглосуточно.<br/>
                            Оператор - Пн-пт: 10:00 - 20:00; Сб-вск: 10:00 - 18:00; <br/>
                            Курьер - Пн-пт: 10:00 - 22:00; Сб-вск: 10:00 - 20:00.</p>
                        <p className="text">Почта: <a href="mailto:info@bookstore.by">info@bookstore.by</a></p>
                        <p className="text">Адрес магазина: Беларусь, Минск, ул. Немига, 3</p>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.5701237158305!2d27.54967441568557!3d53.90384418009958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbcfeba0413c91%3A0xe0fb783d2af93747!2z0YPQuy4g0J3QtdC80LjQs9CwIDMsINCc0LjQvdGB0Lo!5e0!3m2!1sru!2sby!4v1670627793907!5m2!1sru!2sby"
                            width="900" height="450"  style={{border: '0', borderRadius: '25px'}} allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
                <Feedback/>
                <Footer/>
            </Container>
        </>
    );
});

export default Contacts;
