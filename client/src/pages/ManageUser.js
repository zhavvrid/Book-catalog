import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { fetchAllUsersWithOrders, updateUser, deleteUser } from '../http/userAPI';

const ManageUser = () => {
    const [loading, setLoading] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsersAndOrders = async () => {
            try {
                setLoading(true);
                const users = await fetchAllUsersWithOrders();
                const filteredUsers = users.filter(user => user.role === 'USER');
                setUsersData(filteredUsers);
            } catch (error) {
                console.error('Ошибка при загрузке пользователей и их заказов:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsersAndOrders();
    }, []);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setEmail(user.email);
        setShowEditModal(true);
    };

    const handleDelete = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleSave = async () => {
        try {
            await updateUser(selectedUser.id, { email });
            setUsersData(usersData.map(user => user.id === selectedUser.id ? { ...user, email } : user));
            setShowEditModal(false);
        } catch (error) {
            console.error('Ошибка при обновлении пользователя:', error);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteUser(selectedUser.id);
            setUsersData(usersData.filter(user => user.id !== selectedUser.id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
        }
    };

    const handleClose = () => {
        setShowEditModal(false);
        setShowDeleteModal(false);
    };

    return (
        <Container className="text-center">
            <h2 style={{ marginTop: '80px', textAlign: 'center', fontWeight: 'bold' }}>Все пользователи</h2>
            {loading ? (
                <p>Загрузка...</p>
            ) : usersData.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map((user, index) => (
                            <tr key={index}>
                                <td>
                            

                                    <Link to={`/profile/${user.id}`}className="link">{user.email}</Link>
                                </td>
                                <td>
                                    <Button style={{backgroundColor:"#f3fb5e", borderColor:'#f3fb5e', color:'black'}}  onClick={() => handleEdit(user)}>Редактировать</Button>
                                    {' '}
                                    <Button variant="danger" onClick={() => handleDelete(user)}>Удалить</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>Пользователи не найдены</p>
            )}

            <Modal show={showEditModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактировать пользователя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Закрыть</Button>
                    <Button style={{backgroundColor:"#089da1", borderColor:'#089da1', color:'black'}} onClick={handleSave}>Сохранить</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить пользователя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы уверены, что хотите удалить пользователя {selectedUser?.email}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Отмена</Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>Удалить</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ManageUser;
