import {useState, useEffect} from 'react';
import Navbar from './Navbar';
import { setUserSession } from '../utils/Common';
import axios from 'axios';

const Admin = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrormessage] = useState("");
    const [success, setSuccess] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const config = {
            params: {
                _id: localStorage.getItem('_id')
            }
        }
        console.log(config.params._id)
        setUser(config.params._id);
    }, [])

    const handleSubmit = e => {

        e.preventDefault();
        const data = { email, password }
        axios.post(`http://localhost:4000/users/login`, data).then((res) => {
            if (res.data.errorMessage) {
                return setErrormessage(res.data.errorMessage)
            }
            setSuccess("Login Successful");
            // props.history.push('/');
            console.log(res.data.publicProfile, "LOGIN SUCESSFULL")
            // setUserSession(res.data.token, res.data.publicProfile);
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('_id', res.data.publicProfile._id)
            window.location.reload();
        })
            .catch((error) => {
                console.log(error);
            });
        console.log(email, password);

        setEmail("");
        setPassword("");

    }

    const handleLogout=()=>{
        localStorage.clear()
        window.location.reload()
        // this.setState({ state: this.state });
        // this.forceUpdate()
    }
    return (
        <>
            <Navbar/>        
            <div className="container my-5">
               {
                   (user) ? (
                       <div className="text-center">
                           <h2>You are already logged in as Admin. Enjoy the privileges!</h2>
                           <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
                       </div>
                   ):(
                       <div className="loginForm">
                            <form className="signinForm" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <div>
                                        {<small>{errorMessage || success}</small>}
                                    </div>
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary px-3 my-3 uppertext"
                                >
                                    LOG IN
                                </button>
                            </form>
                        </div>
                   )
               }
            </div>
        </>
    )
}

export default Admin;