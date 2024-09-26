import * as coap from 'coap';

// Realiza una solicitud GET a un servidor CoAP
let requerimiento = coap.request({
  method: 'GET',
  pathname: '/light',
  observe: true
});

// Manejador de la respuesta
requerimiento.on('response', (res) => {

  // debo manejar las respuestas dentro de un evento data 
  // para trabajar con observe
  res.on('data', () => {
    let valor : number = parseInt(res.payload.toString());
    console.log("Valor obtenido: " + valor);
  });
});

// En caso de error
requerimiento.on('error', (error) => {
  console.error(`Error de solicitud: ${error.message}`);
});

// Envía la solicitud al servidor
requerimiento.end();

