import { createContext, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import MainLayout from "./layouts/MainLayout";

export const CartContext = createContext();


function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const[cart, setCart]= useState([]);
  
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [navigate]);

  function PrivateRoute({ isAuth, children }) {
    return isAuth ? children : navigate("/login");
  }

  return (
    <CartContext.Provider value={{cart, setCart}}>
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/products"
          element={
            <MainLayout>
              <Products />
            </MainLayout>
          }
        />
        <Route
          path="/products/:id"
          element={
            <MainLayout>
              <Detail />
            </MainLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />

        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/orders"
          element={
            <PrivateRoute isAuth={!!token}>
              <MainLayout>
                <Orders />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute isAuth={!!token}>
              <MainLayout>
                <Checkout />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <MainLayout>
              <ErrorPage />
            </MainLayout>
          }
        />
      </Routes>
    </>
    </CartContext.Provider>
  );
}

export default App;
