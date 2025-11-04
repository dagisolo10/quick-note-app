let editNoteID = null

function openNoteDialog(editNoteID) {
    const dialog = document.getElementById('noteDialog')

    
    if(editNoteID) {
        document.getElementById('dialogHeader').textContent = 'Edit Note'
    }
    else {
        document.getElementById('dialogHeader').textContent = 'Add New Note'
    }
    
    dialog.showModal()
    document.getElementById('noteTitle').focus()
}

function closeNoteDialog() {
    const dialog = document.getElementById('noteDialog')

    dialog.close()
}

const themeToggleBtn = document.getElementById('themeToggleBtn')

themeToggleBtn.addEventListener('click', toggleTheme)

function toggleTheme() {
    document.body.classList.toggle('dark')
}