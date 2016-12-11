const {BrowserWindow,ipcMain,app} = require('electron')
const path = require('path')
const fs = require('fs')

ipcMain.on('showLicense', (e, top) => {
    let licenseWinOpt = {
        title: app.getName() + " - License & Guidlines",
        width: 400,
        height: 600,
        minWidth: 400,
        minHeight: 600,
        parent: top,
        modal: true
    }

    if (process.platform === 'linux') {
            licenseWinOpt.icon = path.join(__dirname, '../../assets/app-icon/512.png')
    }

    licenseWin = new BrowserWindow(licenseWinOpt)
    licenseWin.loadURL(path.join('file://', __dirname, '../../sections/license/license.html'))
    licenseWin.setMenu(null)

    if(app.debug){
        licenseWin.webContents.openDevTools({mode:"undocked"})
        require('devtron').install()
    }

    licenseWin.on('closed', () => {
        licenseWin = null
    })
})

ipcMain.on('getLicense', (e) => {
    fs.readFile(path.join(__dirname, '../../LICENSE'), 'UTF-8', (err, data) => {
        if (err){
            console.log(err.message)
            return
        }

        e.sender.send('getLicenseReply', data)
    })
})