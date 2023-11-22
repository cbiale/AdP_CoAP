import * as coap from 'coap';

// Realiza una solicitud GET a un servidor CoAP
const requerimiento = coap.request({
  method: 'GET',
  pathname: '/holas'
});


// Manejador de la respuesta
requerimiento.on('response', (res) => {
  console.log('Respuesta del servidor CoAP:');
  console.log('Código:', res.code);
  console.log('Payload:', res.payload.toString());
});

// Envía la solicitud al servidor
requerimiento.end();
