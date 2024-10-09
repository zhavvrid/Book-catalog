import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Image } from 'react-bootstrap';
import Footer from '../components/Footer';
import Feedback from '../components/Feedback';
import { observer } from 'mobx-react-lite';
import { fetchOrdersByUserId, fetchBookByOrderId, fetchOneBook } from '../http/bookApi';

const ProfilePage = observer(() => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const [booksInOrder, setBooksInOrder] = useState([]);
    const [bookCounts, setBookCounts] = useState({});

    useEffect(() => {
        const fetchOrderAndBooks = async () => {
            try {
                setLoading(true);
                const orders = await fetchOrdersByUserId(id);
                setOrderData(orders);

                if (orders.length === 0) {
                    setBooksInOrder([]);
                    return;
                }

                const orderedBooks = [];
                const bookCounts = {};

                for (const order of orders) {
                    const books = await fetchBookByOrderId(order.id);
                    books.forEach(book => {
                        if (bookCounts[book.bookId]) {
                            bookCounts[book.bookId] += 1;
                        } else {
                            bookCounts[book.bookId] = 1;
                        }
                        orderedBooks.push(book.bookId);
                    });
                }

                const uniqueBookIds = [...new Set(orderedBooks)];
                const booksInOrd = [];

                for (const bookId of uniqueBookIds) {
                    const book = await fetchOneBook(bookId);
                    booksInOrd.push(book);
                }

                setBookCounts(bookCounts);
                setBooksInOrder(booksInOrd);
            } catch (error) {
                console.error('Ошибка при загрузке заказа и книг:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderAndBooks();
    }, [id]);

    return (
        <Container className="text-center">
            <h2 style={{ marginTop: '80px', textAlign: 'center', fontWeight: 'bold' }}>Заказы пользователя</h2>
            {loading ? (
                <p>Загрузка...</p>
            ) : orderData && orderData.length > 0 ? (
                booksInOrder.length > 0 ? (
                    <>
                        <div className="row justify-content-center">
                            {booksInOrder.map((book, index) => (
                                <div key={index} className="col-lg-4 mb-3" >
                                    <Card style={{ cursor: 'pointer', marginTop: '30px' }}>
                                        <Image variant="top" style={{ display: 'block', margin: '0 auto', width: '150px', height: '200px' }} src={process.env.REACT_APP_API_URL + book.img} />
                                        <Card.Body>
                                            <div style={{ fontSize: '14px', marginBottom: '5px', fontWeight: 'bolder', color: 'gray' }}>{book.title}</div>
                                            <div>{book.price}$</div>
                                            <div>Количество: {bookCounts[book.id]}</div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                        </div>
                        <div className='aveSumm'>
                            <p>Итого за заказ: {booksInOrder.reduce((total, book) => total + book.price * bookCounts[book.id], 0)}$</p>
                        </div>
                    </>
                ) : (
                    <p>Заказов нет</p>
                )
            ) : (
                <p>Заказ не найден</p>
            )}
            <Feedback />
            <Footer />
        </Container>
    );
});

export default ProfilePage;