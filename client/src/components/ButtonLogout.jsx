import axios from 'axios';
import {Link,useHistory} from "react-router-dom";

const ButtonLogout = () => {

    const history = useHistory();

    const cerrarSesion = () => {
        axios.get("http://localhost:8000/api/logout",{withCredentials:true})
            .then(res => history.push("/login"))
            .catch(err => console.log(err));
    }


    return(
        <a className='nav-link'>
            <button className="btn btn-danger float-right" onClick={cerrarSesion}>Cerrar sesión</button>
        </a>
    )
}

export default ButtonLogout;