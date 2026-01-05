// utils/singleton.ts
const instanceMap = new Map<Function, any>();

/**
 * Decorador Singleton para clases.
 * Garantiza que solo exista una instancia de la clase decorada.
 */
export function Singleton<T extends { new (...args: any[]): {} }>(constructor: T) {
  function getInstance(...args: any[]) {
    if (!instanceMap.has(constructor)) {
      const instance = new constructor(...args);
      instanceMap.set(constructor, instance);
    }
    return instanceMap.get(constructor);
  }

  // Retornamos un nuevo constructor que siempre llama a getInstance
  return class {
    constructor(...args: any[]) {
      return getInstance(...args);
    }
  } as any as T;
}
