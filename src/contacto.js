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

        <div className="contenedor-contacto">

            {/* Columna izquierda: título, texto y formulario */}
            <div>
                <h1>Contacto</h1>
                <p>
                    Este es el apartado Contacto, bienvenido!
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

            {/* Columna derecha: el mapa */}
            <div>
                <h3>Nuestra ubicación</h3>
                <iframe
                    title="Ubicación de la empresa"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11956.287271906282!2d-65.38539736678958!3d-24.736157881965813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bc14f9aaaaaab%3A0x69dac60239564277!2sUniversidad%20Cat%C3%B3lica%20de%20Salta!5e0!3m2!1ses-419!2sar!4v1792107789419!5m2!1ses-419!2sar"
                    width="100%"
                    height="500"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

        </div>


    );
}

export default Contacto;