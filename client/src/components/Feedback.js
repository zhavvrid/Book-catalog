import React, { useContext, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Button, Modal } from 'react-bootstrap';
import { FaPhone, FaEnvelopeOpen, FaInstagram, FaFacebook } from "react-icons/fa";
import "../index.css";

const Feedback = observer(() => {
    const { book } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmitReview = () => {
        if (name.trim() === '' || comment.trim() === '') {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        setName('');
        setComment('');
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="feedback">
            <h3>Оставьте свой отзыв здесь!</h3>
            <p className="prev1">Ваше имя:</p>
            <input type="text" placeholder="Имя" className="reviewinput" id="nameInput" value={name} onChange={(e) => setName(e.target.value)} />
            <p className="prev1">Комментарий:</p> 
            <div className="com">
                <textarea name="comment" cols="40" rows="3" className="textreview" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                <span id="charCount">0/255</span>
            </div>
            <Button className="reviewbtn" onClick={handleSubmitReview}>Отправить</Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Отзыв отправлен!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Ваш отзыв был успешно отправлен.
                </Modal.Body>
            </Modal>
        </div>
    );
});

export default Feedback;
