const { addNoteHandler, getAllNoteHandler, getNoteHandler, updateNoteHandler, deleteNoteHandler } = require("./handler")

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNoteHandler
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteHandler
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: updateNoteHandler
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteHandler
    },
]

module.exports = { routes }