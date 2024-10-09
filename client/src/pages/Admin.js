import React from 'react';
import { Container } from 'react-bootstrap';
import { MdPeople, MdStore, MdAssignment } from 'react-icons/md';
import { ALLORDERS_ROUTE, MANAGE_BOOK_ROUTE, MANAGE_USER_ROUTE } from '../utils/consts';
import { NavLink } from 'react-router-dom';
import '../index.css';  // Ensure this line is present to import your CSS file

const Admin = () => {
    return (
        <Container className="d-flex flex-column" style={{ marginTop: '100px' }}>
            <main>
                <div className="row">
                    <div className="col">
                        <div style={{ padding: '35px', textAlign: 'center', height: '100%' }} className="card d-flex flex-column justify-content-between">
                            <div>
                                <div className="left card-title">
                                    <h3>Управление пользователями</h3>
                                </div>
                                <div className="row">
                                    <div style={{ padding: '30px' }} className="grey lighten-3 col waves-effect flex-grow-1">
                                        <MdPeople className="indigo-text text-lighten-1 large" size={50} />
                                        <NavLink className="custom-navlink" to={MANAGE_USER_ROUTE}><h5>Пользователи</h5></NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div style={{ padding: '35px', textAlign: 'center', height: '100%' }} className="card d-flex flex-column justify-content-between">
                            <div>
                                <div className="left card-title">
                                    <h3>Управление товарами</h3>
                                </div>
                                <div className="row">
                                    <div style={{ padding: '30px' }} className="grey lighten-3 col waves-effect flex-grow-1">
                                        <MdStore className="indigo-text text-lighten-1 large" size={50} />
                                        <NavLink className="custom-navlink" to={MANAGE_BOOK_ROUTE}><h5>Добавление</h5></NavLink>
                                    </div>
                                    <div style={{ padding: '30px' }} className="grey lighten-3 col waves-effect flex-grow-1">
                                        <MdAssignment className="indigo-text text-lighten-1 large" size={50} />
                                        <NavLink className="custom-navlink" to={ALLORDERS_ROUTE}><h5>Заказы</h5></NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Container>
    );
};

export default Admin;
