import * as coap from 'coap';

// Realiza una solicitud GET a un servidor CoAP
const requerimiento = coap.request({
  method: 'GET',
  pathname: '/hola'
});

// Manejador de la respuesta
requerimiento.on('response', (res) => {
  console.log('Respuesta del servidor CoAP:');
  console.log('Código:', res.code);
  console.log('Payload:', res.payload.toString());
});

// Envía la solicitud al servidor
requerimiento.end();

// realiza una solicitud POST a un servidor CoAP
const requerimientoPost = coap.request({
  method: 'POST',
  pathname: '/hola'
});

// Manejador de la respuesta
requerimientoPost.on('response', (res) => {
  console.log('Respuesta del servidor al POST:', res.code);
});

// En caso de error
requerimientoPost.on('error', (err) => {
  console.log('Error en la solicitud POST: ' + err);
});

// Envía la solicitud al servidor
requerimientoPost.write("Nuevo mensaje de Hola");
requerimientoPost.end();

// Realiza una nueva solicitud GET a un servidor CoAP
const requerimiento2 = coap.request({
  method: 'GET',
  pathname: '/hola'
});

// Manejador de la respuesta
requerimiento2.on('response', (res) => {
  console.log('Respuesta del servidor CoAP:');
  console.log('Código:', res.code);
  console.log('Payload:', res.payload.toString());
});

// Envía la solicitud al servidor
requerimiento2.end();

