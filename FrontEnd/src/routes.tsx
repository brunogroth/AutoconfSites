import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import Login from "./views/users/Login";
import NotFound from "./views/users/NotFound";
import Signup from "./views/users/Signup";
import UserForm from "./views/users/UserForm";
import Users from "./views/Users";
import Sites from "./views/sites/inativos/Inativos";
import Inativos from "./views/sites/inativos/Inativos";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to='/dashboard' />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/inativos',
        element: <Inativos />
      },
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/users/create',
        element: <UserForm key="userCreate"/>
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate"/>
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to='/login' />
      },
      {
        
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  },
])

export default router