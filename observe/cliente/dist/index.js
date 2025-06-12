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
        let valor = parseInt(res.payload.toString());
        console.log("Valor obtenido: " + valor);
    });
});
// En caso de error
requerimiento.on('error', (error) => {
    console.error(`Error de solicitud: ${error.message}`);
});
// Envía la solicitud al servidor
requerimiento.end();
// Cancela la observación después de 10 segundos
setTimeout(() => {
    console.log("Cancelando observación...");
    // Enviar solicitud GET sin observe para cancelar en el servidor
    const cancelar = coap.request({
        method: 'GET',
        pathname: '/light',
        observe: false // Valor explícito para cancelación
    });
    cancelar.on('response', (res) => {
        console.log("Respuesta de cancelación recibida");
        res.on('data', () => {
            console.log("Valor final: " + res.payload.toString());
            console.log("Observación cancelada exitosamente");
            // Finalizar el proceso después de la cancelación;
            process.exit(0);
        });
    });
    cancelar.end();
}, 10000);
