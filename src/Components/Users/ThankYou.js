import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function ThankYou() {
    const navigate = useNavigate();

    return (
        <div className='thank-you-container'>
                <div className="thank-you">
                    <h1>Thank you for your purchase!</h1>
                    <button className='button' onClick={() => navigate('/furnitures')} > 
                        <p>Continuous Shopping</p>
                        <i className='bx bx-arrow-back' ></i>
                    </button>
                </div>

                <div className='subpages-footer-container'>
                    <Footer />
                </div>
        </div>
    )
}