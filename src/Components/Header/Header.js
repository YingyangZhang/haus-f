import { React, useState, useEffect, useRef} from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header({setIsForm, user, setUser, cart, isHome, screenWidth, transparentBackground}) {
    const [isDropDownMenu, setIsDropDownMenu] = useState(false);
    const navigate = useNavigate();
    let dropDownRef = useRef();

    useEffect(() => {
        let handler = e => {
            if(!dropDownRef.current.contains(e.target)) {
                setIsDropDownMenu(false);
            }
        }

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    })

    function hideDropDown() {
        setIsDropDownMenu(false)
    }

    function handleSignIn() {
        setIsForm(true);
        setIsDropDownMenu(false);
    }

    function handleLogOut() {
        localStorage.removeItem('jwt');
        setIsDropDownMenu(false);
        setUser([]);
        navigate('/');
    }

    function capitalizeString(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }    

    const textColor = {
        color: isHome || screenWidth < 1000 ? '#fff' : "#232323",
    }

    return (
        <div className='header-container container' style={transparentBackground}>
            <div className='nav-container flex-box'>
                <NavLink to='/' exact='true' className='header-logo' style={{color: isHome ? '#fff' : '#232323'}}>HAUS</NavLink>

                <div className={`dropdown-container flex-box ${isDropDownMenu ? 'show-dropdown' : ''}`} ref={dropDownRef}>
                    <ul className='dropdown-menu flex-box'>
                        <li onClick={hideDropDown}><NavLink to='/furnitures' exact='true' style={textColor}>Furnitures</NavLink></li>

                        {user.length === 0 ? 
                            <li onClick={handleSignIn}>
                                <p style={textColor}>Login</p>
                            </li>
                            :
                            <>
                                <li onClick={hideDropDown}>
                                    <NavLink to='/cart' exact='true' style={textColor}>
                                        Cart({cart.length})
                                    </NavLink>
                                </li>

                                <li onClick={hideDropDown} className='dropdown-menu-profile'>
                                    <NavLink to='/profile' exact='true' style={textColor}>
                                        {user.username && capitalizeString(user.username)}
                                    </NavLink>
                                </li>

                                <li className='dropdown-menu-logout flex-box' onClick={handleLogOut}> 
                                    <p style={textColor}>Logout</p> 
                                    <i className='bx bx-log-out' ></i> 
                                </li>
                            </>
                        }
                        
                    </ul>

                    <i className='bx bx-x' onClick={hideDropDown} ></i>
                </div>

                <i className='bx bx-menu-alt-right' onClick={() => setIsDropDownMenu(true)} style={{color: isHome ? '#fff' : '#232323'}} ></i>

                {isDropDownMenu && screenWidth < 1000 &&
                    <div className="trans-background">
                    </div>
                }   
            </div>
        </div>
    )
}