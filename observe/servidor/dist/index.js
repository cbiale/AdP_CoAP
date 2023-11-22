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
const timers_1 = require("timers");
// Crea un servidor CoAP
const servidor = coap.createServer();
// Manejador para la ruta '/example-resource'
servidor.on('request', (req, res) => {
    let payload;
    // verifica la url y el tipo de método
    if (req.url === '/light' && req.method === 'GET') {
        // si observe es distinto de cero
        if (req.headers.Observe !== 0) {
            console.log("Nuevo valor sin observe...");
            res.code = 2.05;
            payload = Math.floor(Math.random() * 100);
            res.end(payload.toString());
        }
        else {
            // si observe es distinto de cero
            const intervalo = setInterval(() => {
                console.log("Nuevo valor...");
                res.code = 2.05;
                payload = Math.floor(Math.random() * 100);
                res.write(payload.toString());
            }, 1000);
            res.on('finish', () => {
                (0, timers_1.clearInterval)(intervalo);
                console.log('Final');
            });
        }
    }
    else {
        res.code = '4.04';
        res.end("URL incorrecto");
    }
});
// Inicia el servidor en el puerto 5683
servidor.listen(() => {
    console.log('Servidor CoAP iniciado en el puerto 5683');
});
