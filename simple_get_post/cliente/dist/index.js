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
