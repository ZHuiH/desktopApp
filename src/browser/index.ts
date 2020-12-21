import { BrowserWindow, Menu } from "electron"

export namespace window {
    export let instance: BrowserWindow | null = null
    export function appInit() {
        let filePath = __dirname + '/../views/index.html'
        create(filePath)
    }

    export function create(filePath: string) {
        instance = new BrowserWindow({
            width: 1000,
            height: 800,
            webPreferences: {
                nodeIntegration: true
            },
            //frame:false
        })
        instance.setMenu(null)
        instance.loadFile(filePath)
    }
}

export namespace menu {
    export function init() {
        Menu.setApplicationMenu(null)
    }
}