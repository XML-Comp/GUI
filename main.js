const electron = require('electron')
const fs = require('fs')
const {app, BrowserWindow, dialog} = electron
const path = require('path')
let isDev = process.env.DEVELOP ? process.env.DEVELOP.trim() == "true" : false

//Globaly scope so the app can see it
let mainWindow;

let createMainWindow = () => {
    let mainWin = new BrowserWindow({
        title: "XML Comparer",
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        show: false
    })
    mainWin.loadURL(`file://${__dirname}/windows/index/index.html`)
    mainWin.on('closed', () => {
        mainWin = null
    })
    mainWin.once('ready-to-show', () => {
        mainWin.show()
    })
    if(isDev){
        mainWin.webContents.openDevTools({mode:"undocked"})
    }
    return mainWin
}

let createLicenseWindow = () => {
    let licenseWin = new BrowserWindow({
        title: "XML Comparer - License & Guidlines",
        width: 400,
        height: 600,
        minWidth: 400,
        minHeight: 600,
        show: false,
        parent: mainWindow,
        modal: true
    })
    licenseWin.loadURL(`file://${__dirname}/windows/license/index.html`)
    licenseWin.on('closed', () => {
        licenseWin = null
    })
    licenseWin.once('ready-to-show', () => {
        licenseWin.show()
    })
    licenseWin.setMenu(null)
    if(isDev){
        licenseWin.webContents.openDevTools({mode:"undocked"})
    }
    return licenseWin
}

let readLicense = () => {
    return fs.readFileSync(`${__dirname}/LICENSE`, "UTF-8")
}

let getFolder = (title) =>{
    return dialog.showOpenDialog({
        title: title,
        defaultPath: app.getPath('home'),
        properties: ['openDirectory']
    })
}

app.on('ready', () => {
    mainWindow = createMainWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
       mainWindow = createMainWindow()
    }
})

exports.createLicenseWindow =  createLicenseWindow
exports.readLicense = readLicense
exports.getFolder = getFolder