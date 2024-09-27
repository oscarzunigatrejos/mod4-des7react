import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MyNavbar from "./components/Navbar";
import Home from './pages/Home';
import Footer from './components/Footer';
import './style.css';
import Register from './pages/Register';
import Login from './pages/Login';
import { Card } from 'react-bootstrap';
import Cart from './pages/Cart';
import Pizza from './pages/Pizza';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import CartProvider from './context/CartContext';
import { UserContext } from "./context/UserContext";
import { useContext } from 'react';

function App() {
  const { token } = useContext(UserContext);
  console.log(token)

  return (
    <>
      <CartProvider>


        <MyNavbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={!token ? <Register /> : <Profile />} />
          <Route path="/login" element={!token ? <Login /> : <Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<Pizza />} />
          <Route path="/profile" element={token ? <Profile /> : <Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </CartProvider>
      <Footer />

    </>
  )
}

export default App
