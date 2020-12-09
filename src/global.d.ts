declare enum CHANNEL{
    COMMEND="command"
}
type ipcTask={
    hash:string,
    resolve:(data?:any)=>void,
    reject:(data?:any)=>void,
}

interface ipc{
    bind:(channel:CHANNEL,ipc:ipcTask)=>boolean
    find:(channel:CHANNEL,hash:string)=>null|ipcTask
    getHash:(factor:CHANNEL)=>string
    send:(channel:CHANNEL,data:ipcFormat)=>Promise<any> 
    delete:(channel:CHANNEL,hash:string)=>void
    getData:()=>void
}

interface Window {
    IPC:ipc,
    runCommand:(command:string,...args:Array<string>)=>Promise<any>
}

/**
 * 通信的格式
 */
type ipcFormat={
    hash:string,
    content:any,
    error?:boolean
}

/**
 * 主进程用到的类型
 */
interface commandHanle{
    getShell:()=>string
    handle:(data:any)=>any
}

interface commandFlatform{
    win32:commandHanle,
    darwin:commandHanle
}

interface ipcMainHandle{
    run:(content:any)=>Promise<any>
}
