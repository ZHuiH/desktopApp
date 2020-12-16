import {env} from "./env"
import child from "child_process"
import shellMap from "./shell/index"

class Exce implements ipcMainHandle{

    public getCommand(command:string):commandHanle |null {
        if(shellMap.hasOwnProperty(command)){
            if(env.getPlatform()=="win32"){
                return shellMap[command].win32
            }
            return shellMap[command].darwin
        }
        return null
    }
    /**
     * run 运行命令
     */
    public run(data:any):Promise<string> {
        let arg="";
        (data.args as Array<string>).forEach(item=>{
            arg+=item+" "
        })
        let shell=this.getCommand(data.command)
        return new Promise((resolve:any,reject)=>{
            if(shell){
                let cmd=`${shell.getShell()} ${arg}`;
                //执行代码
                child.exec(cmd,(err, sto)=>{
                    if(!err){
                        resolve((shell as commandHanle).handle(sto))
                        return
                    }
                    reject()
                })
                return
            }
            reject()
        })
    }
}

export let exce=new Exce