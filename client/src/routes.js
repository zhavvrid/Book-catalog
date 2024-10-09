import BookPage from "./pages/BookPage"
import Admin from "./pages/Admin"
import Shop from "./pages/Shop"
import Auth from "./pages/Auth"
import Contacts from "./pages/Contacts"
import About from './pages/About'
import User from './pages/User'
import AdminPage from './pages/AdminPage'
import ProfilePage from './pages/ProfilePage'
import AllOrders from './pages/allOrders'
import ManageBook from "./pages/ManageBook"
import ManageUser from "./pages/ManageUser"
import { ADMIN_ROUTE, REGISTRATION_ROUTE, ORDER_ROUTE, SHOP_ROUTE,LOGIN_ROUTE,BOOK_ROUTE,CONTACT_ROUTE,ABOUT_ROUTE, SHOP_USER_ROUTE, SHOP_ADMIN_ROUTE, PROFILE_ROUTE, ALLORDERS_ROUTE, MANAGE_BOOK_ROUTE, MANAGE_USER_ROUTE} from "./utils/consts"
import { Component } from "react"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ORDER_ROUTE,
        Component: Admin
    }, 
    {
        path: SHOP_ADMIN_ROUTE,
        Component: AdminPage

    },
    {
        path: PROFILE_ROUTE,
        Component: ProfilePage
    },
    {
        path: ALLORDERS_ROUTE,
        Component: AllOrders
    },
    {
        path: MANAGE_BOOK_ROUTE,
        Component: ManageBook

    },
    {
        path:MANAGE_USER_ROUTE,
        Component:ManageUser
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: BOOK_ROUTE+'/:id',
        Component: BookPage
    },
    {
        path: PROFILE_ROUTE+'/:id',
        Component: ProfilePage
    },
    {
        path: CONTACT_ROUTE,
        Component: Contacts
    },
    {
        path: ABOUT_ROUTE,
        Component: About
    },
    {
        path: SHOP_USER_ROUTE,
        Component: User
    }
]