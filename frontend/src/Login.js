import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";

function Login (){

    const [values, setValues] = useState({
        email : '',
        password : ''
    })

    const [errors,setError] = useState({})

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(Validation(values))

        if(errors.email === "" && errors.password === ""){
            axios.post("http://localhost:2023/login",values).then(res => {
                console.log(res)
                if(res.data === "Success"){
                    navigate("/home")
                }
                else{
                    alert("No Such User Exist!!")
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    const handleInput = (e) => {
        setValues(prevValue => ({...prevValue, [e.target.name] : [e.target.value]}))
    }

    return (
        <div className="d-flex justify-content-between align-items-center bg-black vh-100">
            {/* Left Side - Picture */}
            <div className="left-panel ml-5">
                <img
                    src="https://pbs.twimg.com/profile_images/1683498543967879173/EHRSRyrp_400x400.jpg"
                    alt="Login Background"
                    className="img-fluid"
                    style={{ width: '500px', height: '500px' }}
                />
            </div>

            {/*  Login Form */}
            <div className="right-panel bg-white p-3 rounded w-25 mr-5">
                <h2 className="mb-4">Login Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" name="email" placeholder="Enter Your Email" onChange={handleInput} className="form-control rounded-0" />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" name="password" placeholder="Enter Your Password" onChange={handleInput} className="form-control rounded-0" />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
                    <p className="mb-3">You agree to our terms and policies</p>
                    <Link to="/signup" className="btn btn-light border w-100">Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login