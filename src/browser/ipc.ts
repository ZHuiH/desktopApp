import {ipcMain} from "electron"
import { exce} from "../command/exec"

class Ipc{
    private channel=['test']
    run(){
        this.channel.forEach(item => {
            ipcMain.on(item,(event, arg)=>{
                exce.run('ls').then(res=>{
                    console.log(res)
                })
            })
        });
    }
}

export let ipc=new Ipc