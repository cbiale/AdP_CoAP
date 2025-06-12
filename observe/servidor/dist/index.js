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
// Mapa para mantener registro de observadores y sus intervalos
const observadores = new Map();
// Valor compartido entre todos los clientes
let valorCompartido = Math.floor(Math.random() * 100);
// Intervalo global para actualizar el valor compartido
const intervaloGlobal = setInterval(() => {
    valorCompartido = Math.floor(Math.random() * 100);
    console.log(`Nuevo valor compartido: ${valorCompartido}`);
    // Notificar a todos los observadores
    for (const [clienteId, res] of observadores) {
        if (!res.finished) {
            console.log(`Enviando valor ${valorCompartido} a ${clienteId}`);
            res.code = '2.05';
            res.write(valorCompartido.toString());
        }
        else {
            // Limpiar observadores que ya terminaron
            observadores.delete(clienteId);
        }
    }
}, 1000);
// Manejador para la ruta '/light'
servidor.on('request', (req, res) => {
    const clienteId = req.rsinfo.address + ':' + req.rsinfo.port;
    // verifica la url y el tipo de método
    if (req.url === '/light' && req.method === 'GET') {
        // Solicitud de cancelación de observe
        if (req.headers.Observe === undefined || req.headers.Observe !== 0) {
            // Verificar si el cliente está en observadores
            if (observadores.has(clienteId)) {
                observadores.delete(clienteId);
                console.log(`Cliente ${clienteId} canceló observación`);
                console.log(`Observación cancelada. Observadores restantes: ${observadores.size}`);
            }
            // Responder con valor actual
            res.code = '2.05';
            return res.end(valorCompartido.toString());
        }
        // Nueva solicitud observe
        if (req.headers.Observe === 0) {
            console.log(`Nuevo observador: ${clienteId}`);
            // Registrar el observador
            observadores.set(clienteId, res);
            // Responder con valor inicial
            res.code = '2.05';
            res.write(valorCompartido.toString());
            // Manejar cierre
            req.on('close', () => {
                console.log(`Cliente ${clienteId} cerró conexión`);
                observadores.delete(clienteId);
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
