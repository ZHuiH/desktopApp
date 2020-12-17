import {Data,Active,ACTIVE_TYPE} from "./data"
export function storeActive(store:Data | undefined,action:Active):Data{
    let NewStore=Object.assign({},store)
    switch(action.type){
        case ACTIVE_TYPE.SAVE: 
            NewStore[action.dataKey]=action.content;
        break;
    }
    return NewStore
}

export function save <k extends keyof Data>(dataKey:k,data:any):Active{
    return {
        type:ACTIVE_TYPE.SAVE,
        content:data,
        dataKey:dataKey
    }
}