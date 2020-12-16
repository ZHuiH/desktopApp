const SHELL='docker'

type dataFormat={
    [name:string]:string
}
function shellHandle(data:string):Array<any>{
    let result:Array<any>=[]
    let arr=data.split(/\n/) as Array<string>
    let head=(arr.shift() as string).split(/\s{2,}/)

    if(arr.length >0){
        arr.forEach((item,i)=>{
            let temp=item.split(/\s{2,}/)
            let unit:dataFormat={}
            temp.forEach((val,index)=>{
                if(val){
                    unit[head[index]]=val
                }
            })
            if(Object.keys(unit).length > 0){
                unit['key']=i.toString()
                result.push(unit)
            }
        })
    }
    return result
}

namespace Win32{
    export function getShell():string{
        return SHELL
    }
    export function handle(data:string):any{
        return  shellHandle(data)
    }
}

let win32:commandHanle=Win32

namespace Darwin{
    export function getShell():string{
        return SHELL
    }
    export function handle(data:string):any{
        return shellHandle(data)
    }
}   

let darwin:commandHanle=Darwin

export default {
    win32,
    darwin
}