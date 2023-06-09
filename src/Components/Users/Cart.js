import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Cart({user, cart, setCart, isScrolled}) {
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt");
    const total = cart.reduce((a, c) => {
        return a + (c.furniture.price * c.quantities);
    }, 0);

    function handleAdd(id, quantities) {
        if (quantities <= 9) {
            fetch(`https://haus-db.onrender.com/cart_items/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    'quantities': quantities + 1,
                })
            })
            .then(r => r.json())
            .then(data => {
                const updatedCart = [...cart];
                const index = updatedCart.findIndex(item => item.id === id);
                updatedCart[index] = data.user.cart_items.find(item => item.id === id);
                setCart(updatedCart);
            })
        }
    }

    function handleMinus(id, quantities) {
        if( quantities > 1) {
            fetch(`https://haus-db.onrender.com/cart_items/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    'quantities': quantities - 1,
                })
            }).then(r => r.json())
            .then(data => {
                const updatedCart = [...cart];
                const index = updatedCart.findIndex(item => item.id === id);
                updatedCart[index] = data.user.cart_items.find(item => item.id === id);
                setCart(updatedCart);
            })
        }
    }

    function handleRemove(id) {
        fetch(`https://haus-db.onrender.com/cart_items/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(r => r.json())
        .then(data => {
            setCart(data.user.cart_items);
        })
    }

    function handleEmptyCart() {
        fetch(`https://haus-db.onrender.com/users/clear_bag/${user.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(r => r.json())
        .then(data => {
            setCart(data.user.cart_items);
        })
    }
   
    return (
        <div className='cart-container flex-box container'>
            {cart.length !== 0 ?
            <div className='cart'>
                <div className='cart-cards-container'>
                    <h1>Cart</h1>

                    <div className="cart-cards flex-box">
                        {cart.map(item => {
                            return (
                                <div className='cart-card flex-box' key={item.id}>
                                    <div className='cart-img-container' onClick={() => navigate(`/furnitures/${item.furniture.id}`)}>
                                        <img src={item.furniture.image.thumbnail} alt='image' className="fixed-img" />
                                    </div>

                                    <div className="cart-card-info flex-box">
                                        <div className='cart-card-info-container'>
                                            <h3 onClick={() => navigate(`/furnitures/${item.furniture.id}`)}>
                                                {item.furniture.name}
                                            </h3>
                                            <p>USD {item.furniture.price.toLocaleString()}</p>
                                        </div>

                                        <div className='cart-card-operations-container flex-box'>
                                            <div className='quantity-operation flex-box'>
                                                <p>Quantity</p>

                                                <div className='quantity-buttons flex-box'>
                                                    <i className='bx bx-plus' onClick={() => handleAdd(item.id, item.quantities)}></i>
                                                    <p>{item.quantities}</p>
                                                    <i className='bx bx-minus' onClick={() => handleMinus(item.id, item.quantities)}></i>
                                                </div>
                                            </div>

                                        <div className='remove-button' onClick={() => handleRemove(item.id)}>
                                            <p>Remove Furniture</p>
                                        </div>
                                        </div>
                                    </div>
                                </div> 
                        )})}   
                    </div>

                    <div className='empty-cart-button' onClick={handleEmptyCart}> 
                        <p>Empty Cart</p>
                    </div>
                </div>
                    
                <div className='cart-total-container'>
                    <div className="cart-total flex-box">
                        <div className="cart-total-info">
                            <div className="flex-box">
                                <p>Delivery</p>
                                <p>Excluding delivery</p>
                            </div>

                            <div className='flex-box'>
                                <p>Total(Excel. tax)</p>
                                <p>USD {total.toLocaleString()}</p>
                            </div>
                        </div>

                        <button className='button' onClick={() => navigate('/checkout')}> 
                            <p>Continue to checkout</p>
                            <i className='bx bx-arrow-back' ></i>
                        </button>
                    </div>
                </div>
            </div>
            :
            <p className="empty-cart-message">Your cart is empty.</p> }

            <div className='subpages-footer-container'>
                <Footer />
            </div>
        </div>
    )
}