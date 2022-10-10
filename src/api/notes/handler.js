
class NotesHandler {
    constructor(service) {
        this._service = service;

        // Bind This
        this.getNotesHandler       = this.getNotesHandler.bind(this);
        this.postNoteHandler       = this.postNoteHandler.bind(this);
        this.getNoteByIdHandler    = this.getNoteByIdHandler.bind(this);
        this.putNoteByIdHandler    = this.putNoteByIdHandler.bind(this);
        this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
    }

    postNoteHandler(request, h) {
        // Try Catch
        try {
            const { title = 'untitled', body, tags } = request.payload;
    
            // Fire Add Service
            const noteId = this._service.addNote({ title, body, tags});

            const response = h.response({
                status: 'success',
                message: 'Catatan berhasil ditambahkan',
                data: {
                    noteId
                }
            });
            response.code(201);
            return response;
        } 
        catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message
            });
            response.code(400)
            return response;
        }
    }

    getNotesHandler() {
        // Fire Get Service
        const notes = this._service.getNotes();

        // Response
        return {
            status: 'success',
            data: {
                notes
            }
        }
    }

    getNoteByIdHandler(request, h) {
        // Try Catch
        try {
            const { id } = request.params;    

            // Fire Get Handler
            const note = this._service.getNoteById(id);

            // Return
            return {
                status: "success",
                data: {
                    note
                }
            }
        } 
        catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message
            });
            response.code(404);
            return response;
        }
    }

    putNoteByIdHandler(request, h) {
        // Try Catch
        try {
            const { id } = request.params;    

            // Fire Put Handler
            this._service.editNoteById(id, request.payload);

            // Return
            return {
                status: "success",
                message: "Catatan berhasil diperbaharui"
            }
        } 
        catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message
            });
            response.code(404);
            return response;
        }
    }

    deleteNoteByIdHandler(request, h) {
        // Try Catch
        try {
            const { id } = request.params;    

            // Fire Put Handler
            this._service.deleteNoteById(id);

            // Return
            return {
                status: "success",
                message: "Catatan berhasil dihapus"
            }
        } 
        catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message
            });
            response.code(404);
            return response;
        }
    }
}

module.exports = NotesHandler;