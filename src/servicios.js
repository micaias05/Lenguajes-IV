import imgPython from "./imagenes/pythonypoo.png";
import imgNodejs from "./imagenes/nodejs-sqlserver.jpg";
import imgArqredes from "./imagenes/arqenredes.png";

function Servicios(){

    // 1. Defino el array de datos de forma local
    const listaServicios = [
        {
            id: 1,
            tecnologia: "Python & POO",
            descripcion: "Desarrollo de apliaciones de escritorio y scripts.",
            imagen: imgPython 
        },

        {
            id: 2,
            tecnologia: "Node.js & SQLServer",
            descripcion: "Creación de APIs web y modelado de bases de datos.",
            imagen: imgNodejs 
        },

        {
            id: 3,
            tecnologia: "Arquitectura de Redes",
            descripcion: "Instalación y configuración de redes de diferentes tamaños.",
            imagen: imgArqredes
        }
    ]

    return(
        <div className="contenedor-pagina">
            <h1>Nuestros Servicios IT</h1>
            <div className="grilla-servicios">


                {listaServicios.map((servicios) => (
                    <div key={servicios.id} className="tarjeta-servicio">
                        <img src={servicios.imagen} alt={`Logo de ${servicios.tecnologia}`} width="100"/>
                        <h3> {servicios.tecnologia} </h3>
                        <p> {servicios.descripcion} </p>

                    </div>
                ))}

            </div>
            
        </div>
    );
}

export default Servicios;