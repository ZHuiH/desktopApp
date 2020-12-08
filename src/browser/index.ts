import {BrowserWindow } from "electron"
import { spawn } from 'child_process';

export namespace window {
    export function appInit(){
        create(__dirname+'/../views/index.html')
    }
    
    export function create(filePath:string){
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        })
        win.loadFile(filePath).then(()=>{

        })
    }
}