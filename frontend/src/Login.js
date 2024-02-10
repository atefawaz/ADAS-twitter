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
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
            <h2>Login Form</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" name="email" placeholder="Enter Your Email" onChange={handleInput} className="form-control rounded-0"></input>
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" name="password" placeholder="Enter Your Password" onChange={handleInput} className="form-control rounded-0"></input>
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn btn-success w-100">Login</button>
                    <p>You are agree to our term and policies</p>
                    <Link to="/signup" className="btn btn-default border w-100 bg-light">Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login