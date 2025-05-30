import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import { ShopContext } from './context/ShopContext';
import ShopContextProvider from './context/ShopContext';
import Register from './pages/Register';
import PrivateRoute from "./components/PrivateRoute";
import Footer from './components/Footer';
import Searchbar from './components/Searchbar';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <BrowserRouter> 
        <Navbar />
        <Searchbar/>
        <Routes>
          <Route element={<Login />} path='/'></Route>
          <Route element={<Register/>} path='/register'></Route>
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/collection' element={<PrivateRoute><Collection /></PrivateRoute>} />
          <Route path='/about' element={<PrivateRoute><About /></PrivateRoute>} />
          <Route path='/contact' element={<PrivateRoute><Contact /></PrivateRoute>} />
          <Route path='/product/:productId' element={<PrivateRoute><Product /></PrivateRoute>} />
          <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path='/place-Order' element={<PrivateRoute><PlaceOrder /></PrivateRoute>} />
          <Route path='/orders' element={<PrivateRoute><Orders /></PrivateRoute>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
};

export default App;
