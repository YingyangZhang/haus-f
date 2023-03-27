import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Checkout({cart, setCart, isScrolled, user, setUser}) {
    const subTotal = cart.reduce((a, c) => {
        return a + (c.furniture.price * c.quantities);
    }, 0);
    const shipping = 50;
    const tax = subTotal * .2;
    const total = subTotal + shipping + tax;
    const token = localStorage.getItem("jwt");
    const navigate = useNavigate();

    function handleClick(e) {
        e.preventDefault();

        fetch('https://haus-db.onrender.com/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                'total_price': total,
                'user_id': user.id,
                'items': JSON.stringify(cart),
            })
        })
        .then(r => r.json())
        .then(data => {
            setUser(data.user);
            navigate('/thank_you');
            
            return fetch(`https://haus-db.onrender.com/users/clear_bag/${user.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
        .then(r => r.json())
        .then(data => {
            setCart(data.user.cart_items);
        })
    }

    return (
        <div className='checkout-container flex-box container'>
            <div className='checkout'>
            {cart.length !== 0 &&
                <div className='checkout-order-container'>
                    <div className="checkout-order">
                        <div className="order">
                            <p className='checkout-headline'>Order Summary</p>

                            <div className='checkout-cards-container'>
                                {cart.map(item => {
                                    return (
                                        <div className='checkout-card-container flex-box' key={item.id}>
                                            <div className='checkout-card flex-box'>
                                                <div className='checkout-img-container'>
                                                    <img src={item.furniture.image.thumbnail} alt='image' className='fixed-img' />
                                                </div>

                                                <div className='checkout-card-info-container'>
                                                    <h1>{item.furniture.name}</h1>
                                                    <p>USD {item.furniture.price.toLocaleString()}</p>
                                                </div>
                                            </div>

                                            <p>x{item.quantities}</p>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className='checkout-summary-container'>
                                <div className='checkout-summary'>
                                    <div className='flex-box'>
                                        <p>Subtotal</p>
                                        <p>USD {subTotal.toLocaleString()}</p>
                                    </div>

                                    <div className='flex-box'>
                                        <p>Shipping</p>
                                        <p>USD {shipping}</p>
                                    </div>

                                    <div className='flex-box'>
                                        <p>Taxes</p>
                                        <p>USD {tax.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="checkout-total">
                                    <div className="flex-box">
                                        <p>Total</p>
                                        <p>USD {total.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="checkout-forms-container">
                        <form className='form-container checkout-form' >
                            <h1 className='checkout-headline '>Shipping Information</h1>

                            <div className='form-item-container'>
                                <p>First Name</p>
                                <input type='text' placeholder='Your first name' name='first_name' />
                            </div>

                            <div className='form-item-container'>
                                <p>Last Name</p>
                                <input type='text' placeholder='Your last name' name='last_name' />
                            </div>

                            <div className='form-item-container'>
                                <p>Address</p>
                                <input type='text' placeholder='Street address' name='last_name' />
                                <input type='text' placeholder='Street address line 2' name='last_name' />

                                <div className='form-items-group flex-box'>
                                    <input type='text' placeholder='City' name='city' />
                                    <input type='text' placeholder='State' name='state' />
                                    <input type='text' placeholder='Zip Code' name='zip_code' />
                                </div>
                            </div>

                            <div className='form-item-container'>
                                <p>Phone</p>
                                <input type='text' placeholder='Your phone number' name='last_name' />
                            </div>
                        </form>

                        <form className='form-container checkout-form' >
                            <h1 className='checkout-headline'>Payment Information</h1>

                            <div className='form-item-container'>
                                <p>Card Number</p>
                                <input type='text' placeholder='Your card number' name='card_number' />
                            </div>

                            <div className='form-item-container'>
                                <p>Cardholder Name</p>
                                <input type='text' placeholder='Full name' name='full_name' />
                            </div>

                            <div className='form-items-group flex-box'>
                                <div className='form-item-container'>
                                    <p>Expiration Date</p>
                                    <input type='number' placeholder='MM / YY' name='expiration_date' />
                                </div>

                                <div className='form-item-container'>
                                    <p>Security Code</p>
                                    <input type='number' placeholder='CVV' name='security_code' />
                                </div>
                            </div>

                            <div className='form-buttons-container'>
                                <button className='button' onClick={handleClick}> 
                                    <p>Finish and pay</p>
                                    <i className='bx bx-arrow-back' ></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            }
            </div>
            
            <div className='subpages-footer-container'>
                <Footer />
            </div>
        </div>
    )
}