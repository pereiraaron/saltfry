import React from "react";
import "./RegisterScreen.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { register } from "../../actions/userActions";
import Footer from "../../components/Footer.js/Footer";
import Message from "../../components/Message/Message";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [errortype, setErrorType] = useState("");
    const [errormsg, setErrorMsg] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userRegister = useSelector((state) => state.userRegister);

    const { loading, error, userInfo } = userRegister;

    const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
        if (error) {
            setErrorMsg(error);
            setErrorType("error");
        }
    }, [navigate, userInfo, redirect, error]);

    const handleRegister = (e) => {
        e.preventDefault();

        if (
            name.replace(/\s/g, "").length <= 0 ||
            email.replace(/\s/g, "").length <= 0 ||
            password.replace(/\s/g, "").length <= 0 ||
            confirmpassword.replace(/\s/g, "").length <= 0
        ) {
            setErrorType("validation");
            setErrorMsg("Fields can't be empty");
        } else if (password !== confirmpassword) {
            setErrorType("error");
            setErrorMsg("Passwords do not match!");
        } else {
            dispatch(register(name, email, password));
        }
    };

    return (
        <>
            <div className="registerScreen">
                <form onSubmit={handleRegister} className="register-form">
                    <h1>Sign Up</h1>
                    <Message type={errortype}>{errormsg}</Message>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        className="inputfield"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <input
                        type="email"
                        placeholder="Email address"
                        className="inputfield"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="inputfield"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="inputfield"
                        value={confirmpassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                    <button type="submit">Sign Up</button>
                    <div className="text-container">
                        <span> Have an account?</span>{" "}
                        <Link
                            onClick={() => {
                                setEmail("");
                                setPassword("");
                                setName("");
                                setConfirmPassword("");
                            }}
                            style={{ color: "#795744" }}
                            to={redirect ? `/login?redirect=${redirect}` : "/login"}
                        >
                            {loading ? "Please wait...." : "Log In"}
                        </Link>
                    </div>
                </form>
            </div>
            <div style={{ position: "fixed", width: "100% ", bottom: 0 }}>
                <Footer />
            </div>
        </>
    );
};

export default RegisterScreen;

