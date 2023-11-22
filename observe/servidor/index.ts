import * as coap from 'coap';
import { clearInterval } from 'timers';

// Crea un servidor CoAP
const servidor = coap.createServer();

// Manejador para la ruta '/example-resource'
servidor.on('request', (req, res) => {
  let payload : number;  
  // verifica la url y el tipo de método
  if (req.url === '/light' && req.method === 'GET') {
    // si observe es distinto de cero
    if (req.headers.Observe !== 0) {
      console.log("Nuevo valor sin observe...");
      res.code = 2.05;
      payload = Math.floor(Math.random() * 100);
      res.end(payload.toString());
    } else {
      // si observe es distinto de cero
      const intervalo = setInterval(() => {
        console.log("Nuevo valor...");
        res.code = 2.05;
        payload = Math.floor(Math.random() * 100);
        res.write(payload.toString());
      }, 1000);

      res.on('finish', () => {
        clearInterval(intervalo);
        console.log('Final');
      });
    }
  } else {
    res.code = '4.04';
    res.end("URL incorrecto");
  }
});

// Inicia el servidor en el puerto 5683
servidor.listen(() => {
  console.log('Servidor CoAP iniciado en el puerto 5683');
});
