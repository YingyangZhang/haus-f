import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedFurnitures from "./RelatedFurnitures";
import LoadingScreen from "../Loading/LoadingScreen";
import Footer from "../Footer/Footer";

export default function Inspect({isScrolled, user, setUser, cart, setCart, setIsForm}) {
    const [furniture, setFurniture] = useState({});
    const [relatedFurnitures, setRelatedFurnitures] = useState([]);
    const { id } = useParams();
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem("jwt");

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.pageYOffset;
            const scrollThreshold = 83;
            
            if (scrollPosition > scrollThreshold && !isScrollingDown) {
                setIsScrollingDown(true);
            } else if (scrollPosition < scrollThreshold && isScrollingDown) {
                setIsScrollingDown(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isScrollingDown]);

    useEffect(() => {
        setIsLoading(true);

        fetch(`https://haus-db.onrender.com/furnitures/${id}`)
        .then(r => r.json())
        .then(data => {
            setFurniture(data);
            setIsLoading(false);
        })
    },[id]);

    useEffect(() => {
        fetch('https://haus-db.onrender.com/furnitures')
          .then(r => r.json())
          .then(data => {
            const filteredFurnitures = data.filter(relatedFurniture => {
              return relatedFurniture.category.category_name === furniture.category?.category_name;
            });
            const randomFurnitures = filteredFurnitures.sort(() => Math.random() - 0.5).slice(0, 3);
            setRelatedFurnitures(randomFurnitures);
          });
    }, [furniture.category]);

    function handleAddToCart() {
        if (user.length === 0) return setIsForm(true);
            
        const alreadyInCart = cart.find(item => item.furniture.name === furniture.name);
        if (alreadyInCart) {
            if (alreadyInCart.quantities <= 9) {
                fetch(`https://haus-db.onrender.com/cart_items/${alreadyInCart.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        'quantities': alreadyInCart.quantities + 1,
                    })
                }).then(r => r.json())
                .then(data => {
                    setCart(data.user.cart_items)
                })
            }
        } else {
            fetch('https://haus-db.onrender.com/cart_items/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    'quantities': 1,
                    'user_id': user.id,
                    'furniture_id': furniture.id,
                })
            }).then(r => r.json())
            .then(data => {
                setUser(data.user)
                setCart(data.user.cart_items)
            })
        }
    }

    return ( 
    <div className='inspect-container container'>
        {isLoading && <LoadingScreen />}

        <div className='inspect-header-container'>
            <div className="inspect-header flex-box">
                <div className='inspect-header-left flex-box'>
                    <div className='inspect-furniture'>
                        <h1 className={furniture.name && furniture.name.length > 13 ? 'small-font' : 'big-font'}>
                            {furniture.name}
                        </h1>

                        <p>USD {furniture.price && furniture.price.toLocaleString()}</p>
                    </div>
                </div>

                <div className='inspect-header-right'>
                    <div className='add-to-cart-button flex-box' onClick={handleAddToCart} >
                        <i className='bx bx-plus'></i>

                        <p>Add to Cart</p>
                    </div>
                </div>
            </div>
        </div>

        <div className='inspect-imgs-container flex-box'>
            {furniture.image && 
                Object.values(furniture.image).slice(0, 3).map(src => {
                    return (
                        <div className='inspect-img-container' key={src}>
                            <img src={src} alt='image' className='fixed-img'/>
                        </div>
                    )
                })
            }
        </div>
        
        <div className='inspect-details-container flex-box'>
            <div className='inspect-detail flex-box'>
                <p>Designer</p>

                <p>{furniture.designer}</p>
            </div>

            <div className='inspect-detail flex-box'>
                <p>Material</p>

                <p>{furniture.material}</p>
            </div>

            <div className='inspect-detail flex-box'>
                <p>Dimensions</p>

                <p>{furniture.dimensions}</p>
            </div>

            <div className='inspect-detail flex-box'>
                <p>Origin</p>

                <p>{furniture.origin}</p>
            </div>
        </div>

        <div className='related-furnitures-container'>
            <h1>Related Furnitures</h1>
            
            {relatedFurnitures && <RelatedFurnitures relatedFurnitures={relatedFurnitures} />}
        </div>

        <div className='subpages-footer-container'>
            <Footer />
        </div>

        
    </div>
    )
    
      
}