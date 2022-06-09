import React, {useState} from 'react';
import axios from 'axios';
import {Link,useHistory} from "react-router-dom";


const NuevoAlimento = () => {
    const[nombre,setNombre] = useState("");
    const[date,setDate] = useState("");
    const[cantidad,setCantidad] = useState("");
    const[calorias,setCalorias] = useState("");
    const[errors,setErrors] = useState({});
    const history = useHistory();

    const guardarAlimento = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/visiteur",{
            nombre,
            date,
            cantidad,
            calorias
    },{withCredentials:true})
        .then(res => {
            console.log(res);
            history.push("/");
        })
        .catch(err => {
            if(err.response.status === 401){
                history.push("/login")
            } else {
                setErrors(err.response.data.errors); //guardando los errores 
            }
            
        });
    }

    return(
        <div>

            <div className="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="false">
                <div style={{left:0}} className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Registra el alimento</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={guardarAlimento}>
                                <div className="form-group">
                                    <label htmlFor="nombre">Alimento:</label>
                                    <input id="nombre" name="nombre" type="text" className="form-control" onChange={ (e)=> setNombre(e.target.value) } value={nombre}></input>
                                    {errors.nombre ? <span className="text-danger">{errors.nombre.message}</span> : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nombre">Cantidad:</label>
                                    <input id="cantidad" name="cantidad" type="text" className="form-control" onChange={ (e)=> setCantidad(e.target.value) } value={cantidad}></input>
                                    {errors.cantidad ? <span className="text-danger">{errors.cantidad.message}</span> : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nombre">Calorias:</label>
                                    <input id="calorias" name="calorias" type="text" className="form-control" onChange={ (e)=> setCalorias(e.target.value) } value={calorias}></input>
                                    {errors.calorias ? <span className="text-danger">{errors.calorias.message}</span> : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date">Fecha:</label>
                                    <input id="date" name="date" type="date" className="form-control" onChange={ (e)=> setDate(e.target.value) } value={date}></input>
                                    {errors.date ? <span className="text-danger">{errors.date.message}</span> : null}
                                </div>
                                    <Link to="/" className="btn btn-secondary">Cerrar</Link>
                                    <input type="submit" className="btn btn-success" value="Guardar" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NuevoAlimento;

    {/* <h1>Nuevo alimento</h1>
            <Link to="/" className="btn btn-primary">Dashboard</Link>
            <form onSubmit={guardarAlimento}>
                <div className="form-group">
                <label htmlFor="nombre">Alimento:</label>
                    <input id="nombre" name="nombre" type="text" className="form-control" onChange={ (e)=> setNombre(e.target.value) } value={nombre}></input>
                    {errors.nombre ? <span className="text-danger">{errors.nombre.message}</span> : null}
                </div>

                <input type="submit" className="btn btn-success" value="Guardar" />
                <Link to="/" className="btn btn-info">Cancel</Link>

            </form> */}