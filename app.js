// Primero vamos a hacer los endpoints para los botones

// Seleccionamos el enlace por su ID 
const geolocalizacion_ruta = document.getElementById('geolocalizacion_btn');
const subir_img_ruta = document.getElementById('subir_img_btn');

// Ahora escuchamos el evento del clic
geolocalizacion_ruta.addEventListener('click', (e) => {
    // Evitamos el comportamiento por defecto de la etiqueta <a> (que es recargar la pagina)
    e.preventDefault();

    // Obtenemos a donde tiene que ir el enlace (endpoint)
    const geo_ruta_destino = geolocalizacion_ruta.getAttribute('href');

    // Ahora cambiamos la URL en el navegador usando la API History
    // Usamos pushState pasando un objeto de estado simple, un título vacio, y la nueva ruta
    window.history.pushState({ vista: geo_ruta_destino}, "", geo_ruta_destino);

    cambiarVista(geo_ruta_destino);
});

subir_img_ruta.addEventListener('click', (e) => {
    e.preventDefault();

    const subir_img_ruta_destino = subir_img_ruta.getAttribute('href');

    window.history.pushState({ vista: subir_img_ruta_destino}, "", subir_img_ruta_destino);

    cambiarVista(subir_img_ruta_destino);
})

// Vamos a hacer una función para reemplazar la vista de la web
let cambiarVista = (ruta) => {
    // Primero ocultamos todas las cosas que hay en pantalla 
    document.getElementById('main_vista').style.display = 'none';
    document.getElementById('geolocalizacion_vista').style.display = 'none';
    document.getElementById('subir_img_vista').style.display = 'none';

    if (ruta == '#geolocalizacion'){
        // Ponemos el nombre: 'Geolocalizacion' en el titulo del encabezado
        document.getElementById('barra_superior').style.display = 'flex';
        document.getElementById('titulo_encabezado').textContent = 'Geolocalización';

        // Mostramos la vista que corresponde a la geolocalizacion
        document.getElementById('geolocalizacion_vista').style.display = 'block';

        // Llamamos a la función por medio del objeto navigator. 
        navigator.geolocation.getCurrentPosition(exito, error, configuracion);

    } else if(ruta == '#subir_img') {
        // Ponemos el nombre: 'Subir Imagen' en el titulo del encabezado
        document.getElementById('barra_superior').style.display = 'flex';
        document.getElementById('titulo_encabezado').textContent = 'Subir Imagen';
        document.getElementById('main_vista').style.display = 'none';
        document.getElementById('geolocalizacion_vista').style.display = 'none';
        document.getElementById('subir_img_vista').style.display = 'block';

    } else if(ruta == 'inicio') {
        document.getElementById('barra_superior').style.display = 'none';
        document.getElementById('geolocalizacion_vista').style.display = 'none';
        document.getElementById('subir_img_vista').style.display = 'none';
        document.getElementById('main_vista').style.display = 'block';
    };
}; 

// Esta función sirve para que poder utilizar el boton 'Atras' o 'Adelante'. Escucha el objeto Window 
window.addEventListener('popstate', (e) => {
    // Si el evento tiene un estado guardado
    if (e.state && e.state.vista) {
        // Llamamos a la funcion vista para que muestre el que quedo guardado
        cambiarVista(e.state.vista);
    } else {
        // Si no hay estado (es null), significa que volvimos a la URL original de entrada
        // Entonces mostramos el menu principal y ocultamos el resto
        cambiarVista('inicio');
        console.log('Volviendo al inicio...');
    };
});

// Agrego para que el boton del encabezado tambien pueda volver al incio
const btn_volver_geo = document.getElementById('volver_geo');

btn_volver_geo.addEventListener('click', (e) => {
    e.preventDefault();

    // Usamos el método de la API para simular el btn 'Atras' del navegador
    window.history.back();
});


// Voy a hacer toda la parte de la API de la geolocalizacion

// Primero un objeto configuracion para establecer la configuracion de la API
let configuracion = {
    enableHighAccuracy: true,                   // Permite sacar la localización con mayor precisión
    timeout: 10000,                              // Establece el tiempo para cancelar el llamado a la API
    maximumAge: 6000                            // Busca la posición en el cache del dispositivo 
};

// Función del exito. Caso que no salte ningun error, para ya poder mostrar en pantalla la ubicacion
function exito(ubicacion) {
    const latitud = ubicacion.coords.latitude;
    const longitud = ubicacion.coords.longitude;

    const latitud_span = document.getElementById('latitud_valor');
    const longitud_span = document.getElementById('longitud_valor');

    latitud_span.textContent = latitud;
    longitud_span.textContent = longitud; 
};

function error(error) {
    console.log(`ERROR(${error.code}): ${error.message}`);
};


// Ahora voy con toda la parte para la API para subir la imagen

// 1. Seleccionamos el contenedor HTML que hará de zona de recibimiento
const zoneDrop = document.getElementById('drop_zone');  

// 2. Prevenimos el comportamiento por defecto de sobrevolar
zoneDrop.addEventListener('dragover', (e) => {
    e.preventDefault();
    document.getElementById('drop_zone').className = 'img_sobre_zona';
});

// 3. Atrapamos la acción de soltar
zoneDrop.addEventListener('drop', (e) => {
    e.preventDefault();
    document.getElementById('drop_zone').className = '';

    // Capturamos el archivo usando DataTansfer
    const archivoSubido = e.dataTransfer.files;

    //Si el usuario soltó al menos un archivo...
    if(archivoSubido.length > 0){
        const imagen = archivoSubido[0];    // Agarramos el primero

        // Vamos a verificar que el archivo que se sube sea una imagen y no otro tipo de archivo
        if (!imagen.type.startsWith('image/')) {
            document.getElementById('msg_formato_erroneo').className = 'msg_error';        // Mostramos un msg de error 
            return;                                                                        // Retornamos la función sin que muestre nada
        }

        // Borramos el msg de error porque ahora el formato es el correcto
        document.getElementById('msg_formato_erroneo').className = '';
        document.getElementById('msg_formato_erroneo').style.display = 'none';

        // Creamos el lector
        let lector = new FileReader();

        //Definimos que pasa cuando termine de leer
        lector.addEventListener('loadend', (e) => {
            // e.target.result contiene la imagen lista para usar
            console.log("Archivo leído con exito!", e.target.result);
            
            // Creamos una varible para la imagen y así insertarle un src
            const imagen_subida = document.getElementById('img_subida');
            // Y le cambiamos el atributo src por el que nos dio el lector
            imagen_subida.setAttribute('src',e.target.result);
        });

        // Y por último, le damos la orden de leer como URL
        lector.readAsDataURL(imagen);
    };
});

// Hacemos una función para que cuando el usuario saque la img de la zona sin soltarla cambie de estilo
zoneDrop.addEventListener('dragleave', (e) => {
    e.preventDefault();

    // Le sacamos la clase para que vuelva a su estilo normal
    document.getElementById('drop_zone').className = '';
});


//Esta partecita de codigo es para que verifique la URL y muestre correctamente en que vista se encuentra
// Cuando cargue el script, nos fijamos si hay un "#" en la URL actual
const rutaInicial = window.location.hash;

// Si hay algo en el rutaInicio lo forzamos a que vaya ahí
if (rutaInicial) {
    cambiarVista(rutaInicial);
} else {                            // Si no hay nada que vaya al inicio
    cambiarVista('inicio');
};