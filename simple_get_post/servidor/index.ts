import * as coap from 'coap';

// variable de respuesta
let respuesta = 'Hola, cliente CoAP!';
// Crea un servidor CoAP
const servidor = coap.createServer();

// Manejador para la ruta '/example-resource'
servidor.on('request', (req, res) => {
  
  // verifica la url y el tipo de método
  if (req.url === '/hola' && req.method === 'GET') {
    // Genera la respuesta
    const payload = respuesta;
    // Envía la respuesta al cliente 
    // al enviar contenido se pasa 2.05
    // 2.03 se envía cuando no hay contenido
    res.code = '2.05';
    res.end(payload);
  } else if (req.url === '/hola' && req.method === 'POST') {
    // Manejador para el método POST
    req.on('data', (data: { toString: () => string; }) => {
      // Actualiza la variable 'respuesta' con el contenido del payload
      respuesta = data.toString();
      // Envía una respuesta de éxito (2.04 Changed, cambiado)
      res.code = '2.04';
      res.end();
    });
  } else {
    // porque consideran es conveniente agregar esto
    res.code = '4.04';
    res.end("URL incorrecto");
  }
});

// Inicia el servidor en el puerto 5683
servidor.listen(() => {
  console.log('Servidor CoAP iniciado en el puerto 5683');
});
