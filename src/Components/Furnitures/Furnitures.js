import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-scroll';
import Search from "./Search";
import LoadingScreen from "../Loading/LoadingScreen";
import Footer from "../Footer/Footer";

export default function Furnitures({furnitures, isFurnituresLoading, setFurnitures, searchResult, setSearchResult, isScrolled}) {
    const [selectedCat, setSelectedCat] = useState('All');
    const [isSearch, setIsSearch] = useState(false);
    const filteredFurnitures = searchResult.filter(furniture => {
        return selectedCat === "All" ? furniture : furniture.category.category_name === selectedCat;
    });
    
    const navigate = useNavigate();

    useEffect(() => {
        const handlePopstate = () => {
          window.location.reload();
        };
      
        window.addEventListener('popstate', handlePopstate);
      
        return () => {
          window.removeEventListener('popstate', handlePopstate);
        };
    }, []);

    function handleCat(e) {
        setSelectedCat(e.target.value);
    }

    return (
        <div className='furnitures-container flex-box' id='back-to-top'>
            {isFurnituresLoading && <LoadingScreen />}

            <div className={`furnitures-menu-container flex-box grey-background ${isScrolled ? 'add-dropshadow' : ''}`} >
                <div className="category-container flex-box">
                    <label className="category-selection">
                        <input type="radio" name='selection' value="All" defaultChecked={true} onChange={handleCat} />

                        <span>All</span>
                    </label>

                    <label className="category-selection">
                        <input type="radio" name='selection' value="Chair" onChange={handleCat} />

                        <span>Chair</span>
                    </label>

                    <label className="category-selection">
                        <input type="radio" name='selection' value="Table" onChange={handleCat} />

                        <span>Table</span>
                    </label>

                    <label className="category-selection">
                        <input type="radio" name='selection' value="Sofa" onChange={handleCat} />

                        <span>Sofa</span>
                    </label>
                </div>

                <i className='bx bx-search' onClick={() => setIsSearch(true)}></i>
            </div>

            <div className='cards-container'>
                {filteredFurnitures.map(furniture => {
                    return (
                        <div className='card' onClick={() => navigate(`/furnitures/${furniture.id}`)} key={furniture.id}>
                            <div className='card-img-container'>
                                <img src={furniture.image.thumbnail} alt='image' className='fixed-img' />
                            </div>
                            
                            <div className='card-info-container flex-box'>
                                <p>{furniture.designer}</p>

                                <p>{furniture.name}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <Link to="back-to-top"
                smooth={true}
                duration={500}
                offset={-100} 
                className='back-to-top-button'>
                <i className='bx bx-chevron-up'></i>
            </Link>

            <div className='subpages-footer-container'>
                <Footer />
            </div>

            {isSearch ? 
            <Search setIsSearch={setIsSearch} 
                    furnitures={furnitures} 
                    setFurnitures={setFurnitures} 
                    setSearchResult={setSearchResult}/> 
            : ''}
        </div>
    )
}