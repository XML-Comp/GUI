const { ipcRenderer, remote } = require('electron')
let $ = require(`../../assets/jquery/dist/jquery.min.js`)

ipcRenderer.on('getLicenseReply', (e, license) => {
    $('#licenseText').text(license)
})

$('#closeButton').on('click', () => {
    let window = remote.getCurrentWindow()
    window.close()
})

ipcRenderer.send('getLicense')