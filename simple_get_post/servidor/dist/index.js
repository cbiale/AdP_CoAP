"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const coap = __importStar(require("coap"));
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
    }
    else if (req.url === '/hola' && req.method === 'POST') {
        // Manejador para el método POST
        req.on('data', (data) => {
            // Actualiza la variable 'respuesta' con el contenido del payload
            respuesta = data.toString();
            // Envía una respuesta de éxito (2.04 Changed, cambiado)
            res.code = '2.04';
            res.end();
        });
    }
    else {
        // porque consideran es conveniente agregar esto
        res.code = '4.04';
        res.end("URL incorrecto");
    }
});
// Inicia el servidor en el puerto 5683
servidor.listen(() => {
    console.log('Servidor CoAP iniciado en el puerto 5683');
});
