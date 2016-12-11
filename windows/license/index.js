let remote = require('electron').remote
let gui = remote.require('./main.js')
let $ = require(`../../components/jquery/dist/jquery.min.js`)

$('#licenseText').text(gui.readLicense())

$('#closeButton').on('click', () => {
    let window = remote.getCurrentWindow()
    window.close()
})