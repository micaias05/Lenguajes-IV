// 1. Importamos las herramientas de la libreria
import { HashRouter, Routes, Route, Link} from 'react-router-dom';

// Exportamos el App.css con los estilos para toda la web
import './App.css';

// 2. Importo los componentes que arme
import ContactoVista from './contacto';
import InicioVista from './inicio';
import ServiciosVista from './servicios';
import Error404Vista from './Error404';

function App(){
  // Todo tiene que estar envuelto en BrowserRouter
  return (
    <HashRouter>
      <nav className='menu-navegacion'>
        <ul>
          <li><Link to='/'>Inicio</Link></li>
          <li><Link to='/contacto'>Contacto</Link></li>
          <li><Link to='/servicios'>Servicios</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<InicioVista />}/>
        <Route path='/contacto' element={<ContactoVista />}/>
        <Route path='/servicios' element={<ServiciosVista />}/>
        <Route path='*' element={<Error404Vista/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;