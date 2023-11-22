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
const servidor = coap.createServer({
    multicastAddress: '224.0.1.186'
});
servidor.on('request', (req, res) => {
    console.log('Servidor COAP 1 ha recibido un mensaje');
    const temperatura = Math.floor(Math.random() * (50 - 0) + 0);
    res.end('Servidor COAP 1: ' + temperatura);
});
// Inicia el servidor en el puerto 5683
servidor.listen(() => {
    console.log('Servidor CoAP 1 iniciado en el puerto 5683');
});
