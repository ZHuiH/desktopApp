export type Data={
    network:Array<docker.network>
    image:Array<docker.image>
    container:Array<docker.container>
}

export enum ACTIVE_TYPE{
    SAVE="save",
}

export type Active={
    type:ACTIVE_TYPE
    content:any,
    dataKey:keyof Data
}

namespace docker {

    export type network={
        id:string
        name:string
        driver:string
        scope:string
    }

    export type image={
        id:string
        name:string
        tag:string
        size:string
    }

    export type container={
        id:string
        name:string
        command:string
        status:boolean
        ports:Array<string>
        image:string
    }
}