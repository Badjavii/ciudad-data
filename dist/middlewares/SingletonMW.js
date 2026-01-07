"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Singleton = Singleton;
// utils/singleton.ts
const instanceMap = new Map();
/**
 * Decorador Singleton para clases.
 * Garantiza que solo exista una instancia de la clase decorada.
 */
function Singleton(constructor) {
    function getInstance(...args) {
        if (!instanceMap.has(constructor)) {
            const instance = new constructor(...args);
            instanceMap.set(constructor, instance);
        }
        return instanceMap.get(constructor);
    }
    // Retornamos un nuevo constructor que siempre llama a getInstance
    return class {
        constructor(...args) {
            return getInstance(...args);
        }
    };
}
