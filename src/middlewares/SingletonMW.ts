import { Aspect, AspectContext, JoinPoint, on } from "@aspectjs/core";
import { Singleton } from "./annotations";

@Aspect()
export class SingletonMW {
    private static instances = new Map<any, any>();

    @on.class(Singleton)
    @JoinPoint("*.constructor(any)")
    public applySingleton(ctxt: AspectContext){
        const target = ctxt.target;

        if (SingletonMW.instances.has(target)){
            return SingletonMW.instances.get(target);
        }

        const newInstance =  ctxt.proceed();
        SingletonMW.instances.set(target, newInstance);

        console.log(`Singleton has been applied for ${target.name}`);

        return newInstance;
    }
}
