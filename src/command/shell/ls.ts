namespace Win32{
    export function getShell():string{
        return "dir"
    }
    export function handle(data:any):any{
        console.log(data)
    }
}

let win32:commandHanle=Win32

namespace Darwin{
    export function getShell():string{
        return "ls"
    }
    export function handle(data:string):Array<string>{
        return data.split(/\s/)
    }
}

let darwin:commandHanle=Darwin

export default {
    win32,
    darwin
}