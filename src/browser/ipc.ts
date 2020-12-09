import {ipcMain} from "electron"
import {exce} from "../command/exec"

enum CHANNEL{
    COMMAND="command"
}

type ipcHandle={
    channel:CHANNEL,
    handle:ipcMainHandle
}

class Ipc{
    private data:Array<ipcHandle>=[{
            channel:CHANNEL.COMMAND,
            handle:exce
        }]
    /**
     * 处理渲染线程传过来的数据
     */
    bind(){
        this.data.forEach(item => {
            ipcMain.on(item.channel,(event,arg)=>{
                let arags:ipcFormat=arg
                item.handle.run(arags.content).then(result=>{
                    event.sender.send(item.channel,{
                        hash:arags.hash,
                        content:result
                    })
                }).catch(e=>{
                    event.sender.send(item.channel,{
                        hash:arags.hash,
                        content:e,
                        error:true
                    })
                })
            })
        });
    }
    /**
     * send
     */
    public send() {
    }
}

export let ipc=new Ipc