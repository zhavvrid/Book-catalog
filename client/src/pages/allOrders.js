import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import { fetchAllUsersWithOrders } from '../http/userAPI';

const AllOrders = () => {
    const [loading, setLoading] = useState(false);
    const [usersData, setUsersData] = useState([]);
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

    const goToProfile = (userId) => {
        navigate(`/profile/${userId}`);
    };

    return (
        <Container className="text-center">
            <h2 style={{ marginTop: '80px', textAlign: 'center', fontWeight: 'bold' }}>Все пользователи и их заказы</h2>
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
                                <td>{user.email}</td>
                                <td>
                                <Button style={{ backgroundColor: '#089da1', borderColor: '#089da1' }} onClick={() => goToProfile(user.id)}>Посмотреть заказы</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>Пользователи не найдены</p>
            )}
      
        </Container>
    );
};

export default AllOrders;
