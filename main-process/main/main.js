const { ipcMain, dialog, app } = require('electron')

ipcMain.on('getFolder', (e, title, inputId) => {
    dialog.showOpenDialog({
        title: title,
        defaultPath: app.getPath('home'),
        properties: ['openDirectory']
    }, (file) =>{
        e.sender.send('getFolderReply', file, inputId)
    })
})