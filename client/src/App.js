import {BrowserRouter,Route,Switch} from 'react-router-dom';
import React from 'react';
import ActualizarAlimento from './components/ActualizarAlimento';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Navbar from './components/NavBar';
import NuevoAlimento from './components/NuevoAlimento';
import Nutriente from './components/Nutriente';
import Registro from './components/Registro';
import Search from './components/Search';

import "./style.css";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
            <Route path="/login" render={() => <Login />} />
            <Route path="/register" render={() => <Registro />} />
            <Route path="/nuevo" render={() => <NuevoAlimento />} />
            <Route path="/visiteur/editar/:id" render={() => <ActualizarAlimento />} />
          <React.Fragment> {/* No se utiliza div dentro de switch*/}
            <Navbar />
            <Route path="/" exact render={() => <Dashboard/>} />
            <Route path="/detalle" render={() => <Nutriente />} />
            <Route path="/search" render={() => <Search />} />
          </React.Fragment>
        </Switch>
      </BrowserRouter>
  

    </div>
  );
}

export default App;
