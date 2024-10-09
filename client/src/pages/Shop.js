import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import TypeBar from '../components/TypeBar';
import BookList from '../components/BookList';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchJanrs, fetchBooks } from '../http/bookApi';
import Pages from '../components/Pages';
import "../index.css";
import { TbTruckDelivery } from "react-icons/tb";
import { FaClockRotateLeft } from "react-icons/fa6";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
import Footer from '../components/Footer'
import Feedback from '../components/Feedback'
import {ABOUT_ROUTE} from '../utils/consts'

const Shop = observer(() => {
    const { book } = useContext(Context);

    useEffect(() => {
        fetchJanrs().then(data => book.setJanrs(data));
        fetchBooks(null, null, 1, 2).then(data => {
            book.setBooks(data.rows);
            book.setTotalCount(data.count);
        });
    }, [book]);

    useEffect(() => {
        fetchBooks(book.selectedJanr.id, book.page, 2).then(data => {
            book.setBooks(data.rows);
            book.setTotalCount(data.count);
        });
    }, [book.page, book.selectedJanr]);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    return (
        <>
            <Container style={{ fontFamily: '"Golos", -apple-system, BlinkMacSystemFont, Roboto, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Helvetica, Arial, sans-serif'}}>
    
                <Row>
                    <Col>
                        <div className="main">
                            <div className="main_tag">
                                <h1>WELCOME TO<br /><span>BOOK STORE</span></h1>
                                <p>
                                Вместе с нами вы сможете погрузиться в мир удивительных историй, 
                                проникнуться мудростью и вдохновением каждой страницы. 
                                Добро пожаловать в наш книжный мир, где каждая книга 
                                – это возможность погрузиться в новые миры и пережить невероятные приключения!"
                                </p>
                            </div>
                            <div className="main_img">
                                <Image src="/table.png"/>
                            </div>
                        </div>
                        <div className="roll">
                                        <span>Book Store</span>
                                        <span> Book Store</span>
                                        <span> Book Store</span>
                                        <span> Book Store</span>
                                    </div>
                        <div className="services">

        <div className="services_box">


        <div className="services_card">
        <TbTruckDelivery style={{ color: '#089da1', fontSize: '45px', marginBottom: '15px', cursor: 'pointer' }} />
    <h3>Быстрая доставка</h3>
    <p>
        Быстрая доставка выбранных книг прямо к вам домой или в офис, 
        чтобы вы могли наслаждаться чтением без лишних ожиданий.
    </p>
</div>

<div className="services_card">
<FaClockRotateLeft style={{ color: '#089da1', fontSize: '45px', marginBottom: '15px', cursor: 'pointer' }}/>
    <h3>Круглосуточное обслуживание</h3>
    <p>
        Наша команда всегда готова помочь вам с выбором книги или ответить на ваши вопросы в любое время суток.
    </p>
</div>

<div className="services_card">
<RiDiscountPercentFill style={{ color: '#089da1', fontSize: '45px', marginBottom: '15px', cursor: 'pointer' }}/>
    <h3>Лучшие предложения</h3>
    <p>
        Мы предлагаем лучшие цены на книги различных жанров, чтобы каждый мог найти что-то по своему вкусу по доступной цене.
    </p>
</div>

<div className="services_card">
<MdPayment style={{ color: '#089da1', fontSize: '45px', marginBottom: '15px', cursor: 'pointer' }}/>
    <h3>Безопасная оплата</h3>
    <p>
        Мы гарантируем безопасность вашей платежной информации и предлагаем различные способы оплаты для вашего удобства.
    </p>
</div>

        </div>

    </div>
                        <div className="about">
                <div className="about_image">
                    <Image src="about.png" fluid />
                </div>
                <div className="about_tag">
                    <h1>О нас</h1>
                    <p>
                    Наша история началась с любви к книгам и желания делиться этой любовью с миром. Мы стремимся быть вашим надежным партнером в мире литературы, предлагая широкий выбор книг высокого качества, быструю доставку и отличный сервис. 
                    </p> <p style={{marginTop:'-15px'}}>Добро пожаловать в мир знаний и вдохновения с нами!
                    </p>
                    <NavLink className="about_btn" to={ABOUT_ROUTE} onClick={scrollToTop}>Узнать больше</NavLink>
                </div>
            </div>
    
            <div className="catalog" id="bookList">
                        <TypeBar />
                        <div className='bookList'>
                    <Col>
                        <Row className="mt-2">
                            <BookList />
                            <Pages />
                        </Row>
                    </Col>
                    </div>
            </div>
        </Col>
    </Row>
    <Feedback/>
    <Footer/>
</Container>
</>
);
});

export default Shop;
