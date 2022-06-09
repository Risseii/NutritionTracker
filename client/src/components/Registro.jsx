import React,{useState} from 'react';
import axios from 'axios';
import {useHistory,Link} from "react-router-dom";

const Registro = () => {
    
const [firstName,setFirstName] = useState("");
const [lastName,setLastName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [confirmPassword,setconfirmPassword] = useState("");

const history = useHistory();
const [errors,setErrors] = useState({});


    const registro = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register",{
                firstName,
                lastName,
                email,
                password,
                confirmPassword
            },{withCredentials:true})
            .then( res => {
                console.log(res);
                history.push("/");
            })
            .catch(err => setErrors(err.response.data.errors));
    
            
        }
    
    return(
        
        <div className="container">
            <div className="card" style={{width: "460px"}}>
            <h2 className="text-center">Registro</h2>
                <form onSubmit={registro}>
                    <div className="form-group">
                        <label htmlFor="firstName">Nombre</label>
                        <input type="text" name="firstName" id="firstName" className="form-control" value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
                        {errors.firstName ? <span className="text-danger">{errors.firstName.message}</span> : null}
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Apellido</label>
                        <input type="text" name="lastName" id="lastName" className="form-control" value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
                        {errors.lastName ? <span className="text-danger">{errors.lastName.message}</span> : null}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="text" name="email" id="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                        {errors.email ? <span className="text-danger">{errors.email.message}</span> : null}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="form-control" value={password} onChange={(e)=> setPassword(e.target.value)} />
                        {errors.password ? <span className="text-danger">{errors.password.message}</span> : null}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" className="form-control" value={confirmPassword} onChange={(e)=> setconfirmPassword(e.target.value)}/>
                        {errors.confirmPassword ? <span className="text-danger">{errors.confirmPassword.message}</span> : null}
                    </div>
                    
                    <div className="d-flex justify-content-center">
                        <input type="submit" className="btn btn-success" value="Registrarme" />
                        <Link to="/login" className="btn btn-primary">Regresar</Link>
                    </div>
                </form>
            </div>
        </div>
        
    )

}

export default Registro;