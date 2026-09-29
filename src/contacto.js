// importo el useState para armar el formulario
import { useState} from 'react';

import emailjs from '@emailjs/browser';

function Contacto(){
    
    // Estado para guardar el texto que tipea el usuario
    const [nombre, setNombre] = useState('');
    // Estado para guardar el mensaje de error de ese campo
    const [errorNombre, setErrorNombre] = useState('');
    
    // Estado para guardar el texto que tipea el usuario
    const [apellido, setApellido] = useState('');
    // Estado para guardar el mensaje de error de ese campo
    const [errorApellido, setErrorApellido] = useState('');
    
    // Estado para guardar el texto que tipea el usuario
    const [email, setEmail] = useState('');
    // Estado para guardar el mensaje de error de ese campo
    const [errorEmail, setErrorEmail] = useState('');
    
    // Estado para guardar el texto que tipea el usuario
    const [mensaje, setMensaje] = useState('');
    // Estado para guardar el mensaje de error de ese campo
    const [errorMensaje, setErrorMensaje] = useState('');

    const [estadoEnvio, setEstadoEnvio] = useState({ mensaje: '', tipo: ''});

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Con esta funcion vamos a validar los formularios
    const manejarEnvio = (e) => {
        e.preventDefault();

        let hayErrorres = false;

        // Validacion para el nombre
        if (nombre.trim() === '') {
            setErrorNombre('El nombre es obligatorio.');
            hayErrorres = true;
        } else {
            setErrorNombre('');
        }

        if (apellido.trim() === '') {
            setErrorApellido('El apellido es obligatorio.');
            hayErrorres = true;
        } else {
            setErrorApellido('');
        }

        if (!regexEmail.test(email)) {
            setErrorEmail('El formato del email es incorrecto.');
            hayErrorres = true;
        } else {
            setErrorEmail('');
        }

        if(mensaje.trim() === '') {
            setErrorMensaje('El mensaje es obligatorio.');
            hayErrorres = true;
        } else {
            setErrorMensaje('');
        }

        if(!hayErrorres){
            const templateParams = {
                name: `${nombre} ${apellido}`,
                email: email,
                message: mensaje
            };

            emailjs.send(
                'service_u3lnzdn',
                'template_rt2dyzd',
                templateParams,
                '8kROlBIDi5WsvbloB'
            )
            .then((response) => {
                console.log('Mensaje enviado con éxito!', response.status, response.text);
                setEstadoEnvio({
                    mensaje: 'Tu mensaje fue enviado con éxito!',
                    tipo: 'exito'
                });

                // Limpieza de campos
                setNombre('');
                setApellido('');
                setEmail('');
                setMensaje('');
            })
            .catch((error) => {
                console.error('Error al enviar el mensaje:', error);
                setEstadoEnvio({
                    mensaje: 'Ocurrió un error al enviar el mensaje. Intente de nuevo.',
                    tipo: 'error'
                });
            });
        }

    }; 

    return(
        <div className="contenedor-pagina">
            <h1>Contacto</h1>
            <p>Este es el apartado Contacto, bienvenido!
                No se para que se quisiera poner en contacto con nosotros cuando claramente estamos en blanco, pero si aún así insiste podemos ser muy graciosos en ciertas ocasiones!
            </p>
            <form id="formulario" onSubmit={manejarEnvio}>
                <h3>Registro</h3>

                <label>Nombre:</label>
                <input 
                    type="text" 
                    placeholder="Ingrese su nombre" 
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                {errorNombre && <span className='mensaje-error'>{errorNombre}</span>}
                
                <label>Apellido:</label>
                <input 
                    type="text" 
                    placeholder="Ingrese su apellido" 
                    id="apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                />
                {errorApellido && <span className='mensaje-error'>{errorApellido}</span>}
                
                <label>Email:</label>
                <input 
                    type="email" 
                    placeholder="Ingrese su email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errorEmail && <span className='mensaje-error'>{errorEmail}</span>}

                <label>Ingrese un mensaje:</label>

                <textarea 
                    id="textarea" 
                    maxLength="300" 
                    rows="6" 
                    cols="50" 
                    placeholder="Ingrese su mensaje:"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}    
                ></textarea>
                {errorMensaje && <span className='mensaje-error'>{errorMensaje}</span>}

                <button id="btnEnviar" type="submit">Enviar formulario</button>

                {estadoEnvio.mensaje && (
                    <span className={`alerta-envio ${estadoEnvio.tipo}`}>
                        {estadoEnvio.mensaje}
                    </span>
                )}
            </form>
        </div>
    );
}

export default Contacto;