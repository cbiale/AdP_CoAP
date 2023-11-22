import * as coap from 'coap';

// Crea un servidor CoAP
const servidor = coap.createServer();

// Manejador para la ruta '/example-resource'
servidor.on('request', (req, res) => {
  
  // verifica la url y el tipo de método
  if (req.url === '/hola' && req.method === 'GET') {
    // Genera la respuesta
    const payload = 'Hola, cliente CoAP!';
    // Envía la respuesta al cliente
    res.code = '2.05';
    res.end(payload);
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
