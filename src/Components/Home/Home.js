import React, { useState } from "react";
import Footer from "../Footer/Footer";

export default function Home() {
    const [randomImgIndex, setrandomImgIndex] = useState(randomIndex(0, 2))
    const backgroundImg = ['https://haus-imgs.s3.amazonaws.com/backgroud_01.png', 'https://haus-imgs.s3.amazonaws.com/backgroud_02.png', 'https://haus-imgs.s3.amazonaws.com/backgroud_03.png'];

    function randomIndex(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }   

    const homeBackground = {
        backgroundImage: `url(${backgroundImg[randomImgIndex]})`
    };

    return (
        <div className='home-container' style={homeBackground}>
            <div className='home-headline-container container'>
                <h1>'Make a Statement'</h1>
                
                <p>Experience the art of furniture.</p>
            </div>
            
            <div className='home-footer-container container'>
                <Footer />
            </div>
        </div>
    )
}