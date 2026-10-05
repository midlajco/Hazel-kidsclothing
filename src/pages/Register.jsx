import { useState } from "react"
import { Link ,useNavigate} from "react-router-dom";

import { createUser, getUserByEmail } from "../services/userService";


function  Register() {

    const navigate =useNavigate();
   

    const [apiError, setApiError] = useState("")

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ConPass, setConPass] = useState("");

    const user = {
        name: name,
        email: email,
        password: password,
    }

    const [errors, setErrors] = useState({});

    const validate = () => {



        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Name is required";
        }
        if (!email.trim()) {
            newErrors.email = "Email is required";
        }
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        if (!ConPass) {
            newErrors.ConPass = "Confirm password is required";
        } else if (password !== ConPass) {
            newErrors.ConPass = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setApiError("");
        
        if (!validate()) {
            return;
        };
        const existingUser =await getUserByEmail(email);
        if(existingUser){
            setApiError("Email Already Registered");
            return
        }
        try {
            await createUser(user);
            console.log(user);
            console.log("succsess")
            navigate("/login")
            
        }
        catch (error) {
            setApiError("Registration Failed, please try again")
            console.log(error)
        }
        
    }

    return (
        <div>
            <form onSubmit={(e) => handleRegister(e)} >
                <h1>Register</h1>
                <input type="text"
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name} />
                {errors.name && <p>{errors.name}</p>}
                <input type="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} />
                {errors.email && <p>{errors.email}</p>}
                <input type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} />
                {errors.password && <p>{errors.password}</p>}
                <input type="password"
                    placeholder="confirm password"
                    onChange={(e) => setConPass(e.target.value)}
                    value={ConPass} />
                {errors.ConPass && <p>{errors.ConPass}</p>}
                <button type="submit" >Register</button>
                {apiError && <p>{apiError}</p>}
                <p>Already Registered?<Link to="/login" >Login</Link></p>
            </form>
        </div>
    )
}

export default Register