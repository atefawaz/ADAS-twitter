import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from 'axios'                    // axios for making http requests

function Signup(){

    const [values, setValues] = useState({
        name : '',
        email : '',
        password : ''
    })

    const [errors,setError] = useState({})

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(Validation(values))     // to check the errors and update errors state accordingly

        if(errors.name === "" && errors.email === "" && errors.password === ""){
            axios.post("http://localhost:2023/signup",values).then(res => {        
                console.log(res)
                navigate("/")       // it moves to login page
            })
            .catch(err => {
                console.log(err)
            })
        }

    }

    const handleInput = (e) => {
        setValues((prevValue) => ({...prevValue, [e.target.name] : [e.target.value]}))   // it uses (...) spread operator means it creates shallow copy of previous state

        //shallow copy means any changes done will reflect to original object
        //deep copy means a copy of object created and changes made to copy of object will not reflect to original object
    }
    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Sign-Up Form</h2>
                <form action="" onClick={handleSubmit}>
                <div className="mb-3">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="text" name="name" placeholder="Enter Your Name" onChange={handleInput} className="form-control rounded-0"></input>
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
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
                    <button type="submit" className="btn btn-success w-100">Sign Up</button>
                    <p>You are agree to our term and policies</p>
                    <Link to="/" className="btn btn-default border w-100 bg-light">Login</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup
