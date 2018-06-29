

export default class BaseClass {
    constructor(props:any){
        this.bindAll(this);
    }

    bindAll(instance:any) {
        let parent = Object.getPrototypeOf(instance);
    
        let bindedKeys:any[] = [];
        let constructorName = parent.constructor.name;

        if (parent === null) {
            return;
        }
        
        let names:any = Object.getOwnPropertyNames(parent);
        for (let i:number = 0; i < names.length; i += 1) {
                let name:any = names[i];
                if(typeof instance[name] === "function"){ 
                    if (!bindedKeys[name]) {
                        instance[name] = instance[name].bind(instance);
                        bindedKeys[name] = true;
                    }
                }
            
        }
        parent = Object.getPrototypeOf(parent);
        
    }


    response(callback?:any, callbackData?:any){

        //this.props.data = this.__dataMap;
        let parentClass = Object.assign(this);
        
        parentClass.__dataMap = parentClass.props.data;

        if(parentClass.__callback !== undefined){
            parentClass.__callback(parentClass.__dataMap);
        }

        if(callback !== undefined){
            if(callbackData !== undefined){
                callback(callbackData);
            }else {
                callback(parentClass.__dataMap); 
            }
        }

        return parentClass.__dataMap;
    }
}