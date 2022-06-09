import React,{useState,useEffect} from "react";
import axios from "axios";
import { Pie } from 'react-chartjs-2';
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Nutriente = () => {

    const[alimentos,setAlimentos] = useState([]);
    const[cantidades,setCantidades] = useState([]);
    const[calorias,setCalorias] = useState([]);
    const[totalCalorias,settotalCalorias] = useState([]);

    useEffect(() => { 
        axios.get("http://localhost:8000/api/visiteur",{withCredentials:true}) 
            .then(res => {
                //Para alimentos
                const auxiliarAli = [];
                for(let i=0; i<res.data.length; i++){
                    auxiliarAli.push(res.data[i].nombre)
                }
                setAlimentos(auxiliarAli);
                console.log(auxiliarAli);
                
                //Para las cantidades
                const auxiliarQty = [];
                for(let i=0; i<res.data.length; i++){
                    auxiliarQty.push(res.data[i].cantidad)
                }
                setCantidades(auxiliarQty);

                //Para las calorias unit
                const auxiliarCal = [];
                for(let i=0; i<res.data.length; i++){
                    auxiliarCal.push(res.data[i].calorias)
                }
                setCalorias(auxiliarCal);
                
                //Para el total de calorias
                const auxiliarTotal = [];
                for(let i=0; i<res.data.length; i++){
                    auxiliarTotal.push(res.data[i].cantidad*res.data[i].calorias)
                }
                settotalCalorias(auxiliarTotal);

            })
            .catch(err => console.log(err));
    },[])


    return(
        <div className="d-flex align-items flex-column">  
            <div className="izquierda d-flex">
                <div style={{ width: "500px",margin: "0 auto"}}>
                    <h3 style={{textAlign: "center"}}>Cantidad de alimentos consumidos</h3>
                    <Pie data={{
                    labels: alimentos, 
                    datasets: 
                    [
                        {label: 'Cantidad de alimentos',
                        data: cantidades,  
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1,
                        },
                    ]
                }}/>
                </div>

                <div style={{ width: "500px",margin: "0 auto"}}>
                    <h3 style={{textAlign: "center"}}>Total de calorias por alimento</h3>
                        <Doughnut data={{
                        labels: alimentos, 
                        datasets: 
                        [
                            {label: 'Calorias de alimentos',
                            data: totalCalorias,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1,
                            },
                        ]
                    }} />
                </div>
            </div>

            {/* Agregar otro grafico */}

        </div>
    )
}

export default Nutriente;