import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Profile({user, isScrolled}) {
    const navigate = useNavigate();

    return (
        <div className='profile-container flex-box'>
            <div className={`empty-background grey-background ${isScrolled ? 'add-dropshadow' : ''}`}></div>

            <div className='profile'>
                {user.length !== 0 &&
                    <div className="user-container flex-box">
                        <div className='profile-info-container'>
                            <h1>Welcome Back</h1>
                            <p>{user.first_name} {user.last_name}</p>
                            <p>{user.email}</p>
                        </div>

                        <div className='order-history-container'>
                            <h1>Order History</h1>

                            <div className='history-cards-container flex-box'>
                                {user.orders.length !== 0 ? user.orders.map(order => {
                                    return (
                                        <div className="history-card flex-box" key={order.id}>
                                            <p className='order-date'>{order.created_at.slice(0, 10)}</p>

                                            <div className='history-card-info'>
                                                <div className='flex-box'>
                                                    <p>Order #</p>
                                                    <p>{order.created_at.replace(/[^\w\s]/gi, '')}</p>
                                                </div>

                                                <div className='flex-box'>
                                                    <p>Total</p>
                                                    <p>USD {order.total_price.toLocaleString()}</p>
                                                </div>

                                                {JSON.parse(order.items).map(item => {
                                                    return (
                                                        <div className='flex-box' key={item.id}>
                                                            <p className="history-furniture-name" onClick={() => navigate(`/furnitures/${item.furniture.id}`)}>{item.furniture.name}</p>
                                                            <p>x{item.quantities}</p>      
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <p>You don't have any order yet.</p>
                            }
                            </div>
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