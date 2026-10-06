import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { getUserByEmail } from "../services/userService";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

function Login() {

    const dispatch =useDispatch();
    const navigate =useNavigate();
     const [apiError, setApiError] = useState("")

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});

    const validate = () => {



        const newErrors = {};


        if (!email.trim()) {
            newErrors.email = "Email is required";
        }
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";

          

        }
          setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

        const handleLogin = async  (e) => {
            e.preventDefault();
            setApiError("");
            if(!validate()){
                return;
            }
            const user =await getUserByEmail(email);
            if(!user){
                setApiError("user does not exist")
                return
            }
            if(user.password !== password){
                setApiError("password doesnt match")
                return
            }
            dispatch(login(user));
            localStorage.setItem("user",JSON.stringify(user))
            navigate("/")
            

            

        }

        return (
            <div>
                <form onSubmit={(e) => handleLogin(e)} >
                    <h1>Login</h1>
                    <input type="email"
                        placeholder='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email} />
                        {errors.email && <p>{errors.email}</p>}
                    <input type="password"
                        placeholder='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password} />
                        {errors.password && <p>{errors.password}</p>}
                    <button type='submit' >Login</button>
                    {apiError && <p>{apiError}</p>}
                    <p>Not Reg <Link to="/register" >Regis</Link></p>
                </form>
            </div>
        )
    }


    export default Login 