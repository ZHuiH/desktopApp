import {BrowserWindow ,Menu} from "electron"

export namespace window {
    export let instance:BrowserWindow|null=null
    export function appInit(){
        create(__dirname+'/../views/index.html')
    }
    
    export function create(filePath:string){
        instance = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            },
            frame:false
        })
        instance.loadFile(filePath)
    }
}

export namespace menu{
    export function init(){
       // Menu.setApplicationMenu()
    }
}