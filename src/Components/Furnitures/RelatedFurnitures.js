import React from "react";
import { useNavigate } from "react-router-dom";

export default function RelatedFurnitures({relatedFurnitures}) {
    const navigate = useNavigate();

    function handleClick(id) {
        navigate(`/furnitures/${id}`);
    }

    return (
        <div className='cards-container'>
            {relatedFurnitures.map(relatedFurniture => {
                return (
                    <div className='cards' key={relatedFurniture.id} onClick={() => handleClick(relatedFurniture.id)}>
                        <div className='card-img-container'>
                            <img src={relatedFurniture.image.thumbnail} alt='image' className='fixed-img'/>
                        </div>

                        <div className='card-info-container flex-box'>
                            <p>{relatedFurniture.designer}</p>

                            <p>{relatedFurniture.name}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}