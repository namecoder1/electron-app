import { app, BrowserWindow, Menu, Tray } from "electron";
import { getAssetPath } from "./path-resolver.js";
import path from "path";

export function createTray(mainWindow: BrowserWindow) {
  const tray = new Tray(path.join(getAssetPath(), process.platform === 'darwin' ? 'trayIconTemplate.png' : 'trayIcon.png'))

  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Open', click: () => {
      mainWindow.show()
      if (app.dock) app.dock.show()
    }},
    { label: 'Quit', click: () => app.quit() },
  ]))
}