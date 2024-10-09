import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import BookItem from "./BookItem";

const BookList = observer(() => {
    const { book, addToOrder } = useContext(Context);

    return (
        <div style={{ position: 'relative', top: '50px',marginLeft: '10px'}}>
        <Row style={{ width: '700px', top: '20px', position: 'relative'}}>
            {book.books.map(bookItem =>
                <BookItem key={bookItem.id} book={bookItem} addToOrder={addToOrder} />
            )}
        </Row>
        </div>
    );
});

export default BookList;
