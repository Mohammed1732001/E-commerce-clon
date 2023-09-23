import './App.css';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Product from './components/Product/Product';
import Login from './components/Login/Login';
import Rigistrion from './components/Rigistrion/Rigistrion';
import Cart from './components/Cart/Cart';
import NotFound from './components/NotFoud/NotFound';
import Brands from './components/Brands/Brands';
import toast, { Toaster } from 'react-hot-toast';
import Catogry from './components/Catogry/Catogry';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ProductDitales from './components/ProductDitales/ProductDitales';
import { CounterContextProvider } from './Context/CounterContext';
import { CartContextProvider } from './Context/CartContext';
import CheckOut from './components/CheckOut/CheckOut';
import { useEffect } from 'react';
import AllOrders from './components/AllOrders/AllOrders';

function App() {

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      let token = localStorage.getItem("userToken")
      console.log(token);
      let data = jwtDecode(token)
      console.log(data);
      saveUserData(data)
    }
  }, [])

  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken")
    let decodedToken = jwtDecode(encodedToken)
    setUserData(decodedToken)
  };

  function logOut() {
    setUserData(null)
    localStorage.removeItem("userToken")
    return <Navigate to={"/login"} />
  }

  let routers = createBrowserRouter([
    {
      path: "", element: <Layout logOut={logOut} userData={userData} />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "product", element: <ProtectedRoute><Product /></ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: "checkout", element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
        { path: "ProductDitales/:id", element: <ProtectedRoute><ProductDitales /></ProtectedRoute> },
        { path: "ForgetPassword", element: <ForgetPassword /> },
        { path: "ResetPassword", element: <ResetPassword /> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "rigistrion", element: <Rigistrion /> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "*", element: <NotFound /> },

      ]
    }

  ])

  return <CartContextProvider>




    <Toaster />

    <RouterProvider router={routers} ></RouterProvider>




  </CartContextProvider>







}

export default App;
