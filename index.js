const { app, BrowserWindow, Menu } = require('electron')
const isMac = process.platform === 'darwin'

var win;

const createWindow = () => {  
    win = new BrowserWindow({
      width: 800,
      height: 600
    })
    win.loadFile('src/index.html')
}

const menuTemplate = [
    {
        label: 'Scooter',
        submenu: [
            { 
                label: 'Scooter Übersicht',
                click: async () => {
                    win.loadFile('src/scooters.html')
                }
            },
            { type: 'separator' },
            { 
                label: 'Aufgabenstellung',
                click: async () => {
                    win.loadFile('src/index.html')
                }
            },
            { type: 'separator' },
            isMac ? { role: 'close' } : { role: 'quit' }
        ]

    }
]

const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

