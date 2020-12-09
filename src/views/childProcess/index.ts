import {ipcRenderer} from "electron"

namespace ipcData{
    export enum CHANNEL{
        COMMEND="command"
    }
    export const channels=[CHANNEL.COMMEND]
}

class IPC implements ipc{
    private data:any={}

    /**
     * getData
     */
    public getData() {
        return this.data
    }
    /**
     * getHash
     */
    public getHash(factor?:string):string {
        let timestamp=(new Date).getTime()
        let rand=Math.random();
        let str=unescape(encodeURIComponent(`${timestamp}_${rand}_${factor}`));
        return  window.btoa(str);
    }
    /**
     * bind 绑定
     */
    public bind(channel:string,ipc:ipcTask):boolean {
        if(this.data[channel]){
            if(this.find(channel,ipc.hash)){
                return false
            }
            this.data[channel].push(ipc)
        }else{
            //不存在
            this.data[channel]=[ipc]
        }
        return true
    }

    /**
     * find 
     */
    public find(channel:string,hash:string):null|ipcTask {
        let task:null|ipcTask=null;
        (this.data[channel] as Array<ipcTask>).some((item)=>{
            if(item.hash==hash){
                task=item
                return true
            }
        })
        return task
    }

    /**
     * delete
     */
    public delete(channel:string,hash:string) {
        if(this.data[channel]){
            (this.data[channel] as Array<ipcTask>).some((item,index)=>{
                if(item.hash==hash){
                    this.data[channel].splice(index,1)
                    return true
                }
            })
        }
    }

    /**
     * send
     */
    public send(channel:ipcData.CHANNEL,data:ipcFormat):Promise<any> {
        return new Promise((resolve:any,reject)=>{
            ipcRenderer.send(channel,data)
            this.bind(channel,{
                hash:data.hash,
                resolve:resolve,
                reject:reject
            })
        })
    }
}

window.IPC=new IPC
/**
 * 监听
 */
ipcData.channels.forEach(item=>{
    ipcRenderer.on(item,(event: Electron.IpcRendererEvent,args: ipcFormat)=>{
        let task= window.IPC.find(item,args.hash)
        if(task){
            if(!args.error){
                task.resolve(args.content)
                window.IPC.delete(item,args.hash)
            }else{
                task.reject(args.content)
            }
        }
    })
})


//注入到全局window对象
window.runCommand=function(command:string,...args:Array<string>):Promise<any>{
    return window.IPC.send(ipcData.CHANNEL.COMMEND,{
        hash:window.IPC.getHash(ipcData.CHANNEL.COMMEND),
        content:{
            command:command,
            args
        }
    })
}
