
class NotesService {
    constructor() {
        this._notes = [];
    }

    addNote({ title, body, tags }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newNote = {
            title, tags, body, id, createdAt, updatedAt,
        };

        this._notes.push(newNote);

        // Checking
        const result = this._notes.filter((note) => note.id === id).length > 0;

        // Check Result
        if (!result) {
            throw new Error('Catatan gagal ditambahkan');
        }

        return id;
    }

    getNotes() {
        return this._notes;
    }

    getNoteById(id) {
        const note = this._notes.filter((note) => note.id === id)[0];

        // Check Result
        if (!note) {
            throw new Error('Catatan tidak ditemukan');
        }

        return note;
    }

    editNoteById(id, { title, body, tags }) {
        const index = this._notes.findIndex((n) => n.id === id);

        // Check Index
        if (index === -1) {
            throw new Error('Gagal memperbarui catatan. Id tidak ditemukan');
        }

        // Set Update Date
        const updatedAt = new Date().toISOString();

        // Update
        this._notes[index] = {
            ...this._notes[index],
            title,
            body,
            tags,
            updatedAt
        }
    }

    deleteNoteById(id) {
        const index = this._notes.findIndex((note) => note.id === id);

        // Check Index
        if (index === -1) {
            throw new Error('Catatan gagal dihapus. Id tidak ditemukan');
        }

        this._notes.splice(index, 1);
    }
};

module.exports = NotesService;