import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search({setIsSearch, furnitures, setSearchResult}) {
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    function handleInput(e) {
        setInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        setIsSearch(false);

        const results = furnitures.filter(furniture => {
            return furniture.name.toLowerCase().replace(/\s/g, '').includes(input.toLowerCase().replace(/\s/g, '')) || 
                furniture.designer.toLowerCase().replace(/\s/g, '').includes(input.toLowerCase().replace(/\s/g, ''));
        });

        navigate(`/furnitures?q=${input}`);

        setSearchResult(results);
        
        setInput('');
    }

    return (
        <div className='search-container'>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Type here" autoComplete="off" autoFocus onChange={handleInput} value={input} />
            </form>

            <i className='bx bx-x' onClick={() => setIsSearch(false)}></i>
        </div>
    )
}