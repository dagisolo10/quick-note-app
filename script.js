let notes = []
let editNoteID = null

document.addEventListener('DOMContentLoaded', function () {
    applyStoredTheme()
    notes = loadNote()
    renderNotes()

    document.getElementById('dialogForm').addEventListener('submit', saveNote)
    
    const themeToggleBtn = document.getElementById('themeToggleBtn')

    themeToggleBtn.addEventListener('click', toggleTheme)

    document.getElementById('noteDialog').addEventListener('click', function (event) {
        if (event.target === this) {
            closeNoteDialog()
        }
    })
})

// Save and Load from/to localStorage

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    document.getElementById('themeToggleBtn').textContent = isDark ? '☀️': '🌙'
}

function applyStoredTheme() {
    if(localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark')
        document.getElementById('themeToggleBtn').textContent = '☀️'
    }
}

function saveNotes() {
    localStorage.setItem('quickNotes', JSON.stringify(notes))
}

function loadNote() {
    const savedNotes = localStorage.getItem('quickNotes')
    return savedNotes ? JSON.parse(savedNotes) : []
}

function generateID() {
    return Date.now().toString()
}

function deleteNote(noteID) {
    notes = notes.filter(note => note.id != noteID)
    saveNotes()
    renderNotes()
}

function saveNote(event) {
    event.preventDefault()
    
    const date = new Date()
    const title = document.getElementById('noteTitle').value.trim()
    const content = document.getElementById('noteContent').value.trim()

    if(editNoteID) {
        const index = notes.findIndex(note => note.id === editNoteID)
        notes[index] = {...notes[index], title, content}
    }
    else {
        notes.unshift({ id: generateID(), title: title, content: content, time: date.toLocaleTimeString(), date: date.toDateString()})
    }
    
    document.getElementById('noteTitle').value = ""
    document.getElementById('noteContent').value = ""

    saveNotes()
    renderNotes()
    closeNoteDialog()
}

function renderNotes() {
    const noteContainer = document.getElementById('noteContainer')

    if (notes.length === 0) {
        const credit = document.getElementById('credit')
        credit.style.position = 'absolute'
        credit.style.bottom = '0'
        credit.style.right = '0'
        noteContainer.innerHTML = `
        <div class="empty-state">
            <h2>No Notes Added Yet</h2>
            <p>Create your first note!</p>
            <button class="add-note-btn" onclick="openNoteDialog()">+Add Your First Note</button>
        </div>
        `
        return
    }

    noteContainer.innerHTML = notes.map(note => `
        <div class="note-card">
            <div class="note-card-header">
                <h4>${note.title}</h4>
                <div class="note-card-btns">
                    <button class="note-header-btn" onclick="openNoteDialog('${note.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="var(--text-color)"><path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z"/></svg>
                    </button>
                    <button class="note-header-btn" onclick="deleteNote('${note.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="var(--text-color)"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                    </button>
                </div>
            </div>
            <p>${note.content}</p>
            <p class='note-date'>Note added at ${note.time} on ${note.date}</p>
        </div>`).join("")
}

// Dialog open and close

function openNoteDialog(noteID = null) {
    const dialog = document.getElementById('noteDialog')


    if (noteID) {
        const noteToEdit = notes.find(note => note.id === noteID)
        editNoteID = noteID
        document.getElementById('dialogHeader').textContent = 'Edit Note'
        document.getElementById('noteTitle').value = noteToEdit.title
        document.getElementById('noteContent').value = noteToEdit.content
    }
    else {
        editNoteID = null
        document.getElementById('dialogHeader').textContent = 'Add New Note'
        document.getElementById('noteTitle').value = ''
        document.getElementById('noteContent').value = ''
    }

    dialog.showModal()
    document.getElementById('noteTitle').focus()
}

function closeNoteDialog() {
    const dialog = document.getElementById('noteDialog')

    dialog.close()
}

