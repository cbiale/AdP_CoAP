import * as coap from 'coap';

// Realiza una solicitud GET a un servidor CoAP
const requerimiento = coap.request({
    host: '224.0.1.186',
    multicast: true,
    multicastTimeout: 2000
});

// cuando llegan las respuestas
requerimiento.on('response', (res) => {
  res.on ('data', () =>{
    console.log(res.payload.toString());
  });
});

requerimiento.end();

