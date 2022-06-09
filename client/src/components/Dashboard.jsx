import React, {useState,useEffect} from 'react';
import { Link, useHistory,useParams } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import moment from 'moment';

const Dashboard = () => {

    const[alimentos,setAlimentos] = useState([]); 
    const history = useHistory()
    const[usuarios,setUsuarios] = useState([]);
    
    // const [calorias,setCalorias] = useState({});
    
    //consultar API para el query igual a mango
    // useEffect(() => {
    //         const config = { headers: {
    //             "x-app-id": "89e336e6",
    //             "x-app-key": "2090205c6b08b2a40a788f0a064c4976",
    //             "x-remote-user-id": 0,
    //         }
    //         };
            
    //         axios.post("https://trackapi.nutritionix.com/v2/natural/nutrients",{query:"mango"},config)
            
    //         .then(res => {
    //             console.log(res.data)
    //             setTodos(res.data)
    //         })
    //         .catch(err => {
    //             if(err.response.status === 401){
    //                 history.push("/login");
    //             }
    //         });
    // },[])

    //me regresa todos los nombres de los alimentos
    // useEffect(() => {
    //     const config = { headers: {
    //         "x-app-id": "89e336e6",
    //         "x-app-key": "2090205c6b08b2a40a788f0a064c4976",
    //         "x-remote-user-id": 0,
    //     }
    //     };
    //     axios.get("http://localhost:8000/api/visiteur",{withCredentials:true}) //ruta de get all
    //         .then(res => {
    //             console.log(res.data)
                
    //             const nuevosAlimentos = res.data
    //             setAlimentos(nuevosAlimentos)
    //             nuevosAlimentos.forEach(element => {
    //                 console.log(element)
    //                 axios.post("https://trackapi.nutritionix.com/v2/natural/nutrients",{query:element.nombre},config)
                
    //                 .then(res => {
    //                     console.log(res.data.foods)

    //                     const newCalories = {...calorias}
    //                     newCalories[element.nombre] = res.data.foods[0].nf_calories
    //                     setCalorias(newCalories)
                
    //                 })
    //                 .catch(err => {
    //                     if(err.response.status === 401){
    //                         history.push("/");
    //                     }
    //                 });

                
    //             });
    //             console.log(calorias);
    //         }) 
    //         .catch(err => {
    //             if(err.response.status === 401){
    //                 history.push("/login");
    //             }

    //         });
    // },[])

     //me regresa todos los alimentos con sus campos
    useEffect(() => {
        axios.get("http://localhost:8000/api/visiteur",{withCredentials:true}) //ruta de get all
            .then(res => {setAlimentos(res.data)})
            .catch(err => {
                if(err.response.status === 401){
                    history.push("/login");
                }

            });
    },[])



    //Para la suma total de calorias, se necesita un valor inicial 0 sino saldria error
    const suma = alimentos.map(item => item.cantidad*item.calorias).reduce((a, b) => a + b,0) 

    const borrarAlimento = idAlimento => {
        axios.delete("http://localhost:8000/api/visiteur/" + idAlimento,{withCredentials:true})
            .then(res => {
                //Actualizar lista con FILTER, no saldrá la que se elimina
                let nuevaLista = alimentos.filter(alimento => alimento._id !== idAlimento);
                setAlimentos(nuevaLista);

            })
    }

    return(
        <div>
        <h1 style={{color: '#81557c'}}>Nutrition tracker</h1>
        {/* <h2>
            {usuarios.map((usuario,index)=> (
                usuario.email?
                (<tr key={index}>
                    <td>{usuario.firstName}</td>
                </tr>) : null
                ))}
        </h2> */}
            <div className="tarjeta">Total de calorias: {suma} cal</div>
            <Link to="/nuevo" className="btn btn-secondary" data-toggle="modal" data-target="#exampleModal" style={{backgroundColor: "#867eab",borderColor:"#867eab"}} >Agregar alimento</Link>
            <table className="table table-hover" style={{color: '#81557c'}}>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Alimento</th>
                        <th>Cantidad</th>
                        <th>Calorias (cal)</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
            
                <tbody>
                    {
                            alimentos.map((alimento,index)=> (
                                <tr key={index}>
                                    <td>{moment.utc(alimento.date).format('YYYY-MM-DD')}</td>
                                    <td>{alimento.nombre}</td>
                                    <td>{alimento.cantidad}</td>
                                    {/* <td>{calorias[alimento.nombre]}</td> */}
                                    <td>{alimento.calorias}</td>
                                    <td>{alimento.cantidad * alimento.calorias}</td>
                                    <td>
                                        <Link to={`/visiteur/editar/${alimento._id}`} type="button" className="btn btn-primary" style={{backgroundColor: "#dd92aa",borderColor:"#dd92aa"}} data-toggle="modal" data-target="#exampleModal">Editar</Link>
                                        {/* <Link className="btn btn-primary" to={`/detalle/${alimento._id}`}>Ver detalle</Link> */}
                                        <button className="btn btn-danger" onClick={() => borrarAlimento(alimento._id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                    
                    }

                                
                </tbody>
            </table>
        </div>
        
    )
}

export default Dashboard;