const ClientError = require("../../exceptions/ClientError");

class NotesHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

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
            this._validator.validateNotePayload(request.payload)

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
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message
                });
                response.code(error.statusCode);
                return response;
            }

            const response = h.response({
                status: 'error',
                message: "Maaf, terjadi kegagalan pada server kami."
            });
            response.code(500);
            console.log(error);
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
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message
                });
                response.code(error.statusCode);
                return response;
            }

            const response = h.response({
                status: 'error',
                message: "Maaf, terjadi kegagalan pada server kami."
            });
            response.code(500);
            console.log(error);
            return response;
        }
    }

    putNoteByIdHandler(request, h) {
        // Try Catch
        try {
            this._validator.validateNotePayload(request.payload);

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
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message
                });
                response.code(error.statusCode);
                return response;
            }

            const response = h.response({
                status: 'error',
                message: "Maaf, terjadi kegagalan pada server kami."
            });
            response.code(500);
            console.log(error);
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
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message
                });
                response.code(error.statusCode);
                return response;
            }

            const response = h.response({
                status: 'error',
                message: "Maaf, terjadi kegagalan pada server kami."
            });
            response.code(500);
            console.log(error);
            return response;
        }
    }
}

module.exports = NotesHandler;