import { React, useState } from "react";
import LoadingScreen from "../Loading/LoadingScreen";

export default function SignUp({setIsForm, setIsSignUpForm, setUser, setCart}) {
    const [isLoading, setIsLoading] = useState(false);
    const [signUpInput, setSignUpInput] = useState({
        username: '',
        password: '',
        password_confirmation: '',
        first_name: '',
        last_name: '',
        email: '',
    });
    const [errors, setErrors] = useState([]);

    function handleInput(e) {
        const name = e.target.name;
        let value = e.target.value;

        setSignUpInput({
            ...signUpInput,
            [name]: value,
        })
    }

    function handleSignUp(e) {
        e.preventDefault();

        setIsLoading(true);
        
        fetch('https://haus-db.onrender.com/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: signUpInput,
            })
        }).then(r => {
            if (r.ok) {
                r.json().then(data => {
                    setIsLoading(false);
                    localStorage.setItem("jwt", data.jwt);
                    setUser(data.user);
                    setCart(data.user.cart_items);
                    setIsForm(false);
                })
            } else {
                r.json().then(errors => {
                    setIsLoading(false);
                    console.log(errors);
                    setErrors(errors.errors)
                })
            }
        })
    }

    return (
        <form className='form-container grey-background' onSubmit={handleSignUp}>
            {isLoading && <LoadingScreen />}

            <div className='form-header-container flex-box'>
                <h1>Sign Up</h1>
                <i className='bx bx-x' onClick={() => setIsForm(false)}></i>
            </div>

            <div className='form-item-container'>
                <p>Username</p>
                <input type='text' placeholder='Enter username' name='username' onChange={handleInput} />
            </div>

            <div className='form-items-group flex-box'>
                <div className='form-item-container'>
                    <p>Password</p>
                    <input type='password' placeholder='Enter password' name='password' onChange={handleInput} />
                </div>

                <div className='form-item-container'>
                    <p>Password Confirmation</p>
                    <input type='password' placeholder='Confirm password' name='password_confirmation' onChange={handleInput} />
                </div>
            </div>

            <div className='form-items-group flex-box'>
                <div className='form-item-container'>
                    <p>First Name</p>
                    <input type='text' placeholder='Your first name' name='first_name' onChange={handleInput} />
                </div>

                <div className='form-item-container'>
                    <p>Last Name</p>
                    <input type='text' placeholder='Your last name' name='last_name' onChange={handleInput} />
                </div>
            </div>

            <div className='form-item-container'>
                <p>Email</p>
                <input type='text' placeholder='Enter email' name='email' onChange={handleInput} />
            </div>

            <div className='errors-container'>
                {errors && errors.map(error => {
                    return <p key={error}>* {error}</p>
                })}
            </div>

            <div className='form-buttons-container flex-box'>
                <button className='button' type='submit' > 
                    <p>Confirm</p>
                    <i className='bx bx-arrow-back' ></i>
                </button>
                
                <p className="form-toggle-button" onClick={() => setIsSignUpForm(false)}>Go Back</p>
            </div>
        </form>
    )
}