import React, { useContext } from 'react';
import { Card, Col, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import { useNavigate } from "react-router-dom"
import { Context } from "../index";
import { createOrder } from '../http/bookApi';

const BookItem = ({ book }) => {
    const navigate = useNavigate();
    const { user, order } = useContext(Context);
    const handleAddToCart = async () => {
        try {
            if (!user) {
                console.error("Ошибка: Пользователь не определен");
                return;
            }
            const userId = user.id; 
            const newOrder = await createOrder(user.user.id, book.id, 1, book.price); 
            const existingOrder = order.getOrders().find(order => order.book.id === newOrder.book.id);
            order.addOrder(newOrder);
            console.log("Книга добавлена в корзину:", newOrder);
            console.log("Все заказы:");
            order.getOrders().forEach(order => {
                console.log("Заказ:", order);
            });
            console.log("Добавленная книга:", newOrder.book);            
        } catch (error) {
            console.error("Ошибка при создании заказа:", error);
            console.log("userId:", user ? user.id : null);
            console.log("bookId:", book.id);
            console.log("quantity:", 1);
            console.log("price:", book.price);
        }
    };


    return (
        <Col md={3} >
            <Card className="product-item" style={{ cursor: 'pointer' , marginBottom:'30px'}} border={"light"}>
                <Image className="product-img__img" src={process.env.REACT_APP_API_URL + book.img} />
                <div className="product-content">
                    <div className="text-black-50 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <div>{book.rating}</div>
                            <Image width={18} height={18} src={star} />
                        </div>
                    </div>
                    <div style={{fontSize:'14px', marginBottom:'5px', fontWeight:'bolder', color:'gray'}}>{book.title}</div>
                </div>
                <Button className="add-to-cart-btn" onClick={handleAddToCart}>
                    <i className="fas fa-shopping-cart"></i> В корзину
                </Button>
            </Card>
        </Col>
    );
};

export default BookItem;
