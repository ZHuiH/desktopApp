import {env} from "./env"
import child from "child_process"

function getCommand(command:string):string{
    //只有window的命令需要转换
    if(env.getPlatform()=="win32"){
        switch(command){
            case 'ls':command="dir";break;
        }
    }
    return command
}

class Exce{
    /**
     * run 运行命令
     */
    public run(command:string,...args:Array<string>):Promise<string> {
        let arg=""
        args.forEach(item=>{
            arg+=item=" "
        })
        return new Promise((resolve:any,reject)=>{
            let cmd=`${env.getBash()} ${getCommand(command)} ${arg}`;
            console.log(cmd)
            child.exec(cmd,(err, sto)=>{
                if(err){
                    reject()
                    return
                }
                resolve(sto)
            })
        })
    }
}

export let exce=new Exce