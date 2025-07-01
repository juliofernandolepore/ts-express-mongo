"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rutas_1 = __importDefault(require("./rutas"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express_1.default.json());
app.use(rutas_1.default);
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
