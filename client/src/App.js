import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter, Routes} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import NavBarAdmin from './components/NavBarAdmin';
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import BookList from './components/BookList';
import ProfilePage from './pages/ProfilePage';

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const {book} = useContext(Context)
    const {order} = useContext(Context)
    useEffect(() => {
        check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    console.log("User:", user.user);
    return (
        <BrowserRouter>
    {user.user.role === "ADMIN" ? <NavBarAdmin orders={order} /> : <NavBar orders={order} />}
            <AppRouter />
            <Routes path='/bookList' component = {BookList}></Routes>
            <Routes path="/profile/:id" component={ProfilePage} > </Routes>
        </BrowserRouter>
    );
}) ;

export default App;