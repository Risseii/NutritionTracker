import React, {useState,useEffect} from 'react';
import {useHistory } from "react-router-dom";
import axios from "axios";
// import Box from '@material-ui/core/Box';

const Search = () => {

    const[todos,setTodos] = useState([]);
    const history = useHistory();
    //const [filteredResults, setFilteredResults] = useState([]);
    const[busqueda,setBusqueda] = useState("");
    
    // consultar API para el query igual a mango
    useEffect(() => {
            const config = { headers: {
                "x-app-id": "89e336e6",
                "x-app-key": "2090205c6b08b2a40a788f0a064c4976",
                "x-remote-user-id": 0,
            }
            };
            
            axios.post("https://trackapi.nutritionix.com/v2/natural/nutrients",{query: busqueda},config)
            
            .then(res => {
                console.log(res.data.foods)
                setTodos(res.data.foods)
            
            })
            .catch(err => {
                if(err.response.status === 401){
                    history.push("/login");
                }
            });
    },[busqueda])

    const searchItems = (searchValue) => {
        
        setBusqueda(searchValue);
        console.log(searchValue);
        
        // if (busqueda !== '') {
        //     const filteredData = todos.filter((item) => {
        //         return Object.values(item).join('').toLowerCase().includes(busqueda.toLowerCase())
        //     })
        //     setFilteredResults(filteredData)
        // }
        // else{
        //     setFilteredResults(todos)
        // }
    }
    
    return(
        <div className="container">
            <h2 className="text">Información nutricional</h2>
                <div className="containerInput"> 
                    <input className="form-control inputBuscar"  placeholder='Search...' onChange={(e) => searchItems(e.target.value)} />
                </div>
            <div className="row">
                <div className="col-6">
                    {
                            todos.map((todo,index)=> (
                                <div key={index}>
                                    <img className="img-thumbnail" style={{width: 460,height: 400}} src={todo.photo.highres} alt="alimento"/>
                                </div>
                    ))}
                
                </div>

                <div className="col-6 lista">
                    {
                            todos.map((todo,index)=> (
                                <ul className= "text" key={index}>
                                    <li>Peso de la porción: {todo.serving_weight_grams} g</li>
                                    <li>Calorías: {todo.nf_calories} cal</li>
                                    <li>Grasas: {todo.nf_total_fat} g</li>
                                    <li>Colesterol: {todo.nf_cholesterol} mg</li>
                                    <li>Sodio: {todo.nf_sodium} mg</li>
                                    <li>Carbohidratos: {todo.nf_total_carbohydrate} g</li>
                                    <li>Proteína: {todo.nf_protein} g</li>
                                </ul>
                    ))}
                </div>
            </div>


        </div>
    )

}

export default Search;
