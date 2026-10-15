import React, {useState, useEffect} from 'react';
import axios from 'axios';

const USUARIOS = ['octocat', 'torvalds', 'gaeron', 'sindresorhus']          // Lo pongo aufera del componente porque no cambia nunca. Si estuviera dentro, se volvería a crear cada vez que React dibuja la pantalla

function Inicio(){

    // Estado para guardar los datos de la API, lo seteamos con null porque todavia no hay datos
    const [usuarios, setUsuarios] = useState([]);

    // Estado para guardar los estados de carga, lo seteamos con true porque esta cargando
    const [cargando, setCargando] = useState(true);

    // Estado para guardar los errores, lo seteamos con null porque todavia no hubo error
    const [error, setError] = useState(null);

    useEffect(() => {
        // map reccorre la lista y devuelve un pedido por cada nombre
        const pedidos = USUARIOS.map((nombre) =>
            axios.get(`https://api.github.com/users/${nombre}`)
        );

        // Promise.all espera a que todos los pedidos terminen
        Promise.all(pedidos)
            .then((respuesta) => {
                // respuesta es una lista; de cada una sacamos solo .data
                setUsuarios(respuesta.map((r) => r.data));
            })
            .catch((err) => {
                setError('No se pudieron cargar los perfiles de GitHub.');
                console.error(err);
            })
            .finally(() => {
                setCargando(false);
            });
    }, []);

    const [indice, setIndice] = useState(0);
    const cantidadVisibles = 3;

    const anterior = () =>
    setIndice((i) => (i - 1 + usuarios.length) % usuarios.length);

    const siguiente = () =>
    setIndice((i) => (i + 1) % usuarios.length);

    // Armamos la lista de los perfiles que se ven ahora
    const visibles = Array.from({ length: cantidadVisibles }, (_, i) =>
    usuarios[(indice + i) % usuarios.length]
    );

    if(cargando) {
        return (
            <div className='contenedor-pagina'>
                <h1> Inicio </h1>
                <p> Cargando datos ...</p>
            </div>
        )
    }

    if(error) {
        return(
            <div className='contenedor-pagina'>
                <h1> Inicio </h1>
                <p> {error} </p>
            </div>
        )
    }

    return(
        <div className='contenedor-pagina'>
            <h1>Inicio</h1>
            <div
            className="carrusel"
            onWheel={(e) => (e.deltaY > 0 ? siguiente() : anterior())}
            >
            <button onClick={anterior} className="boton-carrusel">‹</button>

            {visibles.map((u) => (
                <div key={u.id} className="tarjeta-servicio">
                <img src={u.avatar_url} alt={`Avatar de ${u.login}`} width="100" />
                <h3>{u.name || u.login}</h3>
                <p>Repositorios: {u.public_repos}</p>
                <p>Seguidores: {u.followers}</p>
                </div>
            ))}

            <button onClick={siguiente} className="boton-carrusel">›</button>
            </div>
            
        </div>
    )
    
}


export default Inicio;