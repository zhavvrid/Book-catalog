import React, { useContext, useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form } from "react-bootstrap";
import { Context } from "../../index";
import { createBook, fetchJanrs, fetchAuthors } from "../../http/bookApi";
import { observer } from "mobx-react-lite";

const CreateBook = observer(({ show, onHide }) => {
    const { book } = useContext(Context);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [publicationYear, setPublicationYear] = useState('');

    useEffect(() => {
        fetchJanrs().then(data => book.setJanrs(data))
        fetchAuthors().then(data=>book.setAuthors(data))
    }, []);

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const addBook = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('price', price);
            formData.append('img', file);
            formData.append('janrId', book.selectedJanr.id);
            formData.append('author', 100);
            formData.append('publicationYear', publicationYear);
            await createBook(formData);
            onHide();
        } catch (error) {
            console.error('Ошибка при добавлении книги:', error);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить книгу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mb-3">
                        <Dropdown.Toggle>
                        <Form.Label>Жанр книги</Form.Label>
                            {book.selectedJanr ? book.selectedJanr.name : 'Выберите жанр'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {book.janrs.map(janr => (
                                <Dropdown.Item
                                    key={janr.id}
                                    onClick={() => book.setSelectedJanr(janr)}
                                >
                                    {janr.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Group controlId="author">
                        <Form.Label>Автор книги</Form.Label>
                        <Form.Control
                            type="text"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Label>Название книги</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="publicationYear">
                        <Form.Label>Год издания</Form.Label>
                        <Form.Control
                            type="text"
                            value={publicationYear}
                            onChange={e => setPublicationYear(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Цена</Form.Label>
                        <Form.Control
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="img">
                        <Form.Label>Изображение</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={selectFile}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Закрыть</Button>
                <Button variant="primary" onClick={addBook}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateBook;
