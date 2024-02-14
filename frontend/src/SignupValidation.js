function Validation(values){
    // alert("")
    let error = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(values.name === ""){
        error.name = "Name should not be empty"
    }
    else{
        error.name = ""
    }

    if(values.email === ""){
        error.email = "Email should not be empty"
    }
    else if(!emailPattern.test(values.email)){
        error.email = "Email did not match"
    }
    else{
        error.email = ""
    }

    if(values.password === ""){
        error.password = "Password should not be empty"
    }
    
    else{
        error.password = ""
    }

    return error
}

export default Validation