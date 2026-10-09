import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmail } from "../services/userService";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    const handleLogin = async (e) => {
        e.preventDefault();
        setApiError("");

        if (!validate()) {
            return;
        }

        const user = await getUserByEmail(email);

        if (!user) {
            setApiError("user does not exist")
            return
        }

        if (user.password !== password) {
            setApiError("password doesnt match")
            return
        }

        dispatch(login(user));
        localStorage.setItem("user", JSON.stringify(user))
        navigate("/")
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-6 text-black">

            <form
                onSubmit={(e) => handleLogin(e)}
                className="w-full max-w-md"
            >

                <div className="mb-10 text-center">
                    <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gray-500">
                        HAZEL
                    </p>

                    <h1 className="text-4xl font-light uppercase tracking-[0.2em]">
                        Login
                    </h1>
                </div>


                <div className="space-y-6">

                    <div>
                        <label className="mb-2 block text-xs uppercase tracking-[0.2em]">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className={`w-full border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />

                        {errors.email && (
                            <p className="mt-2 text-xs text-red-600">
                                {errors.email}
                            </p>
                        )}
                    </div>


                    <div>
                        <label className="mb-2 block text-xs uppercase tracking-[0.2em]">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className={`w-full border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black ${
                                errors.password
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />

                        {errors.password && (
                            <p className="mt-2 text-xs text-red-600">
                                {errors.password}
                            </p>
                        )}
                    </div>


                    <button
                        type="submit"
                        className="w-full border border-black bg-black px-6 py-4 text-sm uppercase tracking-[0.25em] text-white transition hover:bg-white hover:text-black"
                    >
                        Login
                    </button>

                    {apiError && (
                        <p className="border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
                            {apiError}
                        </p>
                    )}

                </div>


                <div className="mt-8 border-t border-gray-200 pt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Not Registered?{" "}
                        <Link
                            to="/register"
                            className="text-black underline underline-offset-4"
                        >
                            Register
                        </Link>
                    </p>
                </div>

            </form>

        </div>
    )
}

export default Login