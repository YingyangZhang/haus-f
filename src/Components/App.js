import '../index.css';
import { Route, Routes, useLocation } from "react-router-dom";
import Header from './Header/Header';
import Home from './Home/Home';
import Furnitures from './Furnitures/Furnitures';
import Inspect from './Furnitures/Inspect';
import Forms from './Users/Forms';
import Cart from './Users/Cart';
import Checkout from './Users/Checkout';
import Profile from './Users/Profile';
import ThankYou from './Users/ThankYou';
import ScrollRestoration from './ScrollRestoration';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);
  const [furnitures, setFurnitures] = useState([]);
  const [searchResult, setSearchResult] = useState(furnitures);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [isFurnituresLoading, setIsFurnituresLoading] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const location = useLocation();
  const token = localStorage.getItem("jwt");
  const whiteText = {
    color: isHome ? '#fff' : ''
  };
  
  useEffect(() => {
    if (token !== null) {
    fetch("https://haus-db.onrender.com/me", {
      method: "GET",
      headers: {
      Authorization: `Bearer ${token}`,
      },
    })
    .then(r => r.json())
    .then(data => {
      setUser(data.user);
      setCart(data.user.cart_items)
      console.log(data.user);
    })
    }
  },[])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY >= 3);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsFurnituresLoading(true);

    fetch('https://haus-db.onrender.com/furnitures')
    .then(r => r.json())
    .then(data => {
        console.log(data);
        const ascendingFurnitures = [...data].sort((a, b) =>
        a.name > b.name ? -1 : 1);
        setFurnitures(ascendingFurnitures);
        setSearchResult(ascendingFurnitures);
        setIsFurnituresLoading(false);
    })
  },[])

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsHome(location.pathname === "/");
  }, [location.pathname]);

  return (
    <div className="App">
      <ScrollRestoration />
      <Header setIsForm={setIsForm} user={user} setUser={setUser} cart={cart} whiteText={whiteText} screenWidth={screenWidth}/>
      {isForm ? <Forms setIsForm={setIsForm} setUser={setUser} setCart={setCart} /> : null}

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/furnitures' 
               element={<Furnitures furnitures={furnitures} 
               isScrolled={isScrolled}
               isFurnituresLoading={isFurnituresLoading}
               setFurnitures={setFurnitures} 
               searchResult={searchResult} 
               setSearchResult={setSearchResult}/>} >
        </Route>

        <Route path='/furnitures/:id' 
               element={<Inspect isScrolled={isScrolled} user={user} setUser={setUser} cart={cart} setCart={setCart} setIsForm={setIsForm} />} >
        </Route>

        <Route path='/cart' 
               element={<Cart cart={cart} setCart={setCart} isScrolled={isScrolled} />} >
        </Route>

        <Route path='/checkout' 
               element={<Checkout cart={cart} setCart={setCart} user={user} setUser={setUser} isScrolled={isScrolled} />} >
        </Route>

        <Route path='/profile' 
               element={<Profile user={user} isScrolled={isScrolled} />} >
        </Route>

        <Route path='/thank_you' 
               element={<ThankYou />} >
        </Route>
      </Routes>
    </div>
  )
}

export default App;
