import React, { useContext } from 'react';
import Image from 'react-bootstrap/Image';
import { FaTrash } from 'react-icons/fa';
import { Context } from "../index";

const Order = ({ item, orderId}) => {
    const {order} = useContext(Context)
    const handleDeleteFromCart = () => {
        console.log("Книга удаляется из корзины:", orderId);
        order.deleteOrder(orderId); 
    };
    return (
        <div className='item'>
            <Image className="product-img__img" src={process.env.REACT_APP_API_URL + item.img} />
            <h2>{item.title}</h2>
            <p>{item.price}$</p>
            <FaTrash className='delete-icon' onClick={handleDeleteFromCart} />
        </div>
    );
};

export default Order;
