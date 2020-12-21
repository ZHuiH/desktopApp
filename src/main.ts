import { app, dialog } from 'electron';
import { window, menu } from "./browser/index"
import { env } from "./command/env"
import { ipc } from "./browser/ipc"


if (env.getPlatform()) {
  app.whenReady().then(window.appInit)
  ipc.bind()
  //menu.init()
  app.on('window-all-closed', function () {
    app.quit()
  })

} else {
  dialog.showErrorBox("平台错误", '只支持macOS或者window')
}





