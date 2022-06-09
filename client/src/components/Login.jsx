import React,{useState} from 'react';
import axios from 'axios';
import {useHistory,Link} from "react-router-dom";

const Login = () => {

const history = useHistory();

const [emailLogin,setEmailLogin] = useState("");
const [passwordLogin,setPasswordLogin] = useState("");

const [errorsLogin,setErrorsLogin] = useState("");

    const login = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login",{
            email: emailLogin,
            password: passwordLogin
        },{withCredentials:true})
            .then( res => {
                console.log(res);
                if(res.data.error) {
                    setErrorsLogin(res.data.message);
                } else {
                    history.push("/");
                }
                
            })
            .catch(err => console.log(err));
}

    return (
    
    <div className="container">
        <div className="card" style={{width: "460px"}}>
        <h2>Iniciar sesión</h2>
        <form onSubmit={login}>
            <div className="form-group">
                <label htmlFor="emailLogin">E-mail</label>
                <input type="email" name="emailLogin" id="emailLogin" className="form-control" value={emailLogin} onChange={(e)=> setEmailLogin(e.target.value)}/>
            </div>

            <div className="form-group">
                <label htmlFor="passwordLogin">Password</label>
                <input type="password" name="passwordLogin" id="passwordLogin" className="form-control" value={passwordLogin} onChange={(e)=> setPasswordLogin(e.target.value)} />
            </div>
            <div> 
                {errorsLogin !== "" ? <span className="text-danger">{errorsLogin}</span> : null}
            </div>
            
            <input type="submit" className="btn btn-primary" value="Iniciar sesión" />
            <Link to="/register" className="btn btn-success">Registrate aquí</Link>
        </form>
        </div>
    </div>

    )

}

export default Login;