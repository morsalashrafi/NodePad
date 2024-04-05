import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

export default class Application{
    constructor(root){
        this.notes = [];
        this.activeNote = null ;
        this.view = new NotesView(root , this._handlers());
        this._refreshNotes();
    };

    _refreshNotes(){
        const notes = NotesAPI.getAllNotes();
        this.notes = notes ;
        this.view.updateNoteList(notes);
        this.view.updateNodePreviewVisibility(notes.length > 0);
        this.activeNote = notes[0];
        this.view.updateActiveNote(notes[0]);
    }

    _handlers(){
        return {
            // key value کردیم
          onNoteAdd:() => {
            
            console.log("add....");
            const newNote = {
              title: "New Note",
              content: " My Note",
            };

            NotesAPI.saveNote(newNote);
            this._refreshNotes(); 
          },


          onNoteEdit:(newTitle, newBody) => {
            //console.log(newTitle, newBody);
            NotesAPI.saveNote({
              id: this.activeNote.id,
              title: newTitle,
              content: newBody,
            });

            this._refreshNotes();
          },


          onNoteSelect:(noteId) => {
            //console.log(noteId);
            const selectedNote = this.notes.find((n)=> n.id == noteId );
            this.activeNote = selectedNote;
            this.view.updateActiveNote(selectedNote);
            
          },


          onNoteDelete:(noteId) => {
            //console.log(noteId);
            NotesAPI.deleteNote(noteId);
            this._refreshNotes();

          },
        };
    }
};

