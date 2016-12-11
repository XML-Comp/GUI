const { ipcRenderer, remote } = require('electron')
const path = require('path')
const $ = require(`../../assets/jquery/dist/jquery.min.js`)

let agreeCheckbox = $('#agreeCheckbox')

let changeButtonState = (elem) => {
    let checked = elem.checked
    $('#submitPaths').prop('disabled', !checked)
    $('#downloadFiles').prop('disabled', !checked)
}

changeButtonState(agreeCheckbox)

ipcRenderer.on('getFolderReply', (e, folder, inputId) => {
    $(inputId).val(folder)
})

agreeCheckbox.on('change', function() {
    changeButtonState(this)
})

$('#licenseLink').on('click', () => {
    ipcRenderer.send('showLicense', remote.getCurrentWindow())
})

$('#gameFolderBrowse').on('click', () => {
    ipcRenderer.send('getFolder', 'Game Language Folder', '#gamesFolderPath')
})

$('#localFolderBrowse').on('click', () => {
    ipcRenderer.send('getFolder', 'Local Language Folder', '#localFolderPath')
})