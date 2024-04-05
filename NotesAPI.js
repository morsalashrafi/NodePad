const notes = [
  {
    id: 1,
    title: "My first note",
    content: "This is my first note",
    updated: "2022-09-28T17:12:52.264Z",
  },
  {
    id: 2,
    title: "My second note",
    content: "This is my second note",
    updated: "2021-08-28T17:12:52.264Z",
  },
  {
    id: 3,
    title: "My third note",
    content: "This is my third note",
    updated: "2023-03-28T17:12:52.264Z",
  },
];

export default class NotesAPI {
  static getAllNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];

    return savedNotes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static saveNote(noteToSave) {
    const notes = NotesAPI.getAllNotes();
    const existedNote = notes.find((note) => note.id == noteToSave.id);
    if (existedNote) {
      existedNote.title = noteToSave.title;
      existedNote.content = noteToSave.content;
      existedNote.updated = new Date().toISOString();
    } else {
      noteToSave.id = new Date().getTime();
      noteToSave.updated = new Date().toISOString();

      notes.push(noteToSave);
    }

    localStorage.setItem("notes-app", JSON.stringify(notes));
  }

  static deleteNote(id) {
    const notes = NotesAPI.getAllNotes();
    const filteredNotes = notes.filter((note) => note.id != id);
    localStorage.setItem("notes-app", JSON.stringify(filteredNotes));
  }
}
