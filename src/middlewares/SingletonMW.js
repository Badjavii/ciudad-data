"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Singleton = Singleton;
// utils/singleton.ts
var instanceMap = new Map();
/**
 * Decorador Singleton para clases.
 * Garantiza que solo exista una instancia de la clase decorada.
 */
function Singleton(constructor) {
    function getInstance() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!instanceMap.has(constructor)) {
            var instance = new (constructor.bind.apply(constructor, __spreadArray([void 0], args, false)))();
            instanceMap.set(constructor, instance);
        }
        return instanceMap.get(constructor);
    }
    // Retornamos un nuevo constructor que siempre llama a getInstance
    return /** @class */ (function () {
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return getInstance.apply(void 0, args);
        }
        return class_1;
    }());
}
