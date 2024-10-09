import React, {useState} from 'react';
import { observer } from 'mobx-react-lite';
import "../index.css";
import CreateJanr from "../components/modals/createJanr";
import CreateBook from "../components/modals/createBook";
import { Container, Button } from 'react-bootstrap';

const ManageBook = observer(() => {
    const [JanrVisible, setJanrVisible] = useState(false);
    const [BookVisible, setBookVisible] = useState(false);
    return (
        <>
             <Container className="d-flex flex-column" style={{ marginTop: '100px' }}>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setJanrVisible(true)}
            >
                Добавить жанр
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setBookVisible(true)}
            >
                Добавить книгу
            </Button>
            <CreateJanr show={JanrVisible} onHide={() => setJanrVisible(false)} />
            <CreateBook show={BookVisible} onHide={() => setBookVisible(false)} />
            </Container>
        </>
    );
});

export default ManageBook;
