import React, { useState } from 'react'
import validator from "validator";
import '../login.css'
import Vector from '../images/Vectors.svg'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [messageE, setMessageE] = useState(" ");
    const [messageP, setMessageP] = useState(" ");
    const navigate = useNavigate();


    function handleEmail(event) {
        let new_Email = event.target.value;
        setEmail(new_Email);
        if (!validator.isEmail(new_Email)) {
            setMessageE("Please, enter a valid email!");
        } else {
            setMessageE("");
        }

    }
    function handlePassword(event) {
        let new_Pass = event.target.value;
        setPass(new_Pass);
    }


    async function handleLogin(event) {


        // console.log(email, password)
        event.preventDefault()
        let item = { email, password };
        console.log("item", item)
        try {
            let result = await fetch("http://localhost:3000/api/user/login", {
                // mode: 'cors',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            });

            result = await result.json();

            console.log("resultst", result)

            // navigate('/AddMovie');
            if (email === "" || email == null) {
                setMessageE("Email is required")
            }
            if (password === "" || password == null) {
                setMessageP("Password is required")
            }
            else if (result.status === "true") {
                console.log("result status", result.status)
                // alert("sca")
                localStorage.setItem("user-info", JSON.stringify(result))

                navigate('/AddMovie');
                toast.success(result.message, {
                    autoClose: 3000

                });

            }
            else {

                console.error("Login failed");
                toast.error(result.message);
            }
        }
        catch (error) {
            console.error('error during login:', error);
        }

    };
    // useEffect(() => {
    //     if (localStorage.getItem('user-info')) {
    //         navigate('/AddMovie')
    //     }
    // })

    return (
        <>
            <div id="box1" >
                <h1 className='container' > Sign in</h1>
                <form action="" >
                    <div >

                        <input type="email" name="email" id="email" placeholder='Email' onChange={handleEmail} />
                        <div style={{ color: "red" }}> {messageE} </div>
                    </div>
                    <div>

                        <input type="password" name="password" id="passw" placeholder='Password' onChange={handlePassword} />
                        <div style={{ color: "red" }}> {messageP} </div>
                    </div>
                    <div>
                        <input type="checkbox" name="remember" id="remember" value="Remember me" />
                        <label style={{ color: "white" }} htmlFor="remember"> Remember me</label>
                    </div>

                    <button type="submit" onClick={handleLogin}>Login</button>

                    {/* <Link to="/AddMovie">
                        <button type="submit" >Login</button>
                    </Link> */}
                </form>
            </div>
            <img src={Vector} className="fix" alt="logo" />
        </>
    )
}

export default Login   