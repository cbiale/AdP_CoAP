import * as coap from 'coap';

// Crea un servidor CoAP
const servidor = coap.createServer(
  {
    multicastAddress: '224.0.1.186'
  }
);

servidor.on('request', (req, res) => {
    console.log('Servidor COAP 1 ha recibido un mensaje');
    const temperatura = Math.floor(Math.random() * (50 - 0) + 0);
    res.end('Servidor COAP 1: ' + temperatura);
});

// Inicia el servidor en el puerto 5683
servidor.listen(() => {
  console.log('Servidor CoAP 1 iniciado en el puerto 5683');
});
