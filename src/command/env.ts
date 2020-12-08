import os from "os"

class ENV {
    constructor(){
        this.setENV()
    }
    private PLATFORM=""
    private BASH=""
    //设置平台以及bash
    private setENV(){
        //只允许2个平台 
        switch(os.platform()){
            case "win32": 
                this.PLATFORM="win32";
                this.BASH="cmd.exe";
                break;
            case "darwin": 
                this.PLATFORM="darwin";
                this.BASH="/bin/bash -c";
                break;
        }
    }

    public getPlatform():string{
        return this.PLATFORM
    }
    public getBash():string{
        return this.BASH
    }
}

export var env=new ENV