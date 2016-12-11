let remote = require('electron').remote
let gui = remote.require('./main.js')
let $ = require(`../../components/jquery/dist/jquery.min.js`)

let agreeCheckbox = $('#agreeCheckbox')

let changeButtonState = (elem) => {
    let checked = elem.checked
    $('#submitPaths').prop('disabled', !checked)
    $('#downloadFiles').prop('disabled', !checked)
}

changeButtonState(agreeCheckbox)

agreeCheckbox.on('change', function() {
    changeButtonState(this)
})

$('#licenseLink').on('click', () => {
    gui.createLicenseWindow()
})

$('#gameFolderBrowse').on('click', () => {
    $('#gamesFolderPath').val(gui.getFolder())
})

$('#localFolderBrowse').on('click', () => {
    $('#localFolderPath').val(gui.getFolder())
})