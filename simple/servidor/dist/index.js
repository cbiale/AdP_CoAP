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
