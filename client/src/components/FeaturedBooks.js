import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import { Card, Image } from "react-bootstrap";

const FeaturedBooks = observer(() => {
    const { book } = useContext(Context);

    return (
        <div className="featured_books">
            <h1>Featured Books</h1>
            <div className="featured_book_box">
                <Row style={{ width: '100px', top: '20px', position: 'relative' }}>
                    {book.books.map(bookItem =>
                        <Card className="product-item" border={"light"} key={bookItem.id}>
                            <Image className="product-img__img" src={process.env.REACT_APP_API_URL + bookItem.img} />
                            <div className="product-content">
                                <div className="text-black-50 d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div>{bookItem.rating}</div>
                                        <Image width={18} height={18} />
                                    </div>
                                </div>
                                <div style={{ fontSize: '14px', marginBottom: '5px', fontWeight: 'bolder', color: 'gray' }}>{bookItem.title}</div>
                            </div>
                        </Card>
                    )}
                </Row>
            </div>
        </div>
    );
});

export default FeaturedBooks;
