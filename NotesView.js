export default class NotesView {
  constructor(root, handlers) {
    this.root = root;

    const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.onNoteDelete = onNoteDelete;

    this.root.innerHTML = `  <h1 class="display-4 text-center">
        <img width="80" height="80"
            src="./image/icons8-notepad-68.png"
            alt="external-Notepad-leadership-smashingstocks-mixed-smashing-stocks" />
            My Notepad
        </h1>
        <form id="note-form">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" id="title" class="form-control notes-title">
                <br>
                <label for="content">Content</label>
                <input type="text" id="content" class="form-control input-body notes-body"></input>
            </div>
            <div class="swatches">
                <div class="bg-primary swatch active"></div>
                <div class="bg-secondary swatch"></div>
                <div class="bg-success swatch"></div>
                <div class="bg-danger swatch"></div>
                <div class="bg-warning swatch"></div>
                <div class="bg-info swatch"></div>
                <div class="bg-light swatch"></div>
                <div class="bg-dark swatch"></div>
                <div class="bg-white swatch"></div>
            </div>
            <button type="submit" class="btn btn-primary btn-block"> Add Note </button>
            <input type="text" id="noteid" class="hidden">
        </form>
        <div id="note-list" class="notelist">
           
        </div>  `;

    const addNoteBtn = this.root.querySelector(".btn");
    const inputTitle = this.root.querySelector(".notes-title");
    const inputBody = this.root.querySelector(".notes-body");

    addNoteBtn.addEventListener("click", () => {
      //run add method
      this.onNoteAdd();
    });

    [inputTitle, inputBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const newBody = inputBody.value.trim();
        const newTitle = inputTitle.value.trim();
        this.onNoteEdit(newTitle, newBody);
      });
    });

    //hide for fist loading()
    this.updateNodePreviewVisibility(false);
  }

  _createListItemHTML(id, title, content, updated) {
    const MAX_CONTENT_LENGTH = 30;

    return `<div class="card" data-note-id="${id}">
                    <div class="card-header">
                        <h2>${title}</h2>
                        <div class="image-container">
                            <img class="note-trash" data-note-id="${id}" src="/image/icons8-trash-50.png" alt="trash">
                        </div>
                    </div>
                    <div class="card-body bg-primary ">
                        <h4> ${content.substring(0, MAX_CONTENT_LENGTH)}${
      content.length > MAX_CONTENT_LENGTH ? "..." : ""
    }</h4>
                        <h5>${new Date(updated).toLocaleString("en", {
                          dateStyle: "full",
                          timeStyle: "short",
                        })}</h5>
                    </div>
                </div> `;
  }

  updateNoteList(notes) {
    //console.log(notes);
    const noteContainer = this.root.querySelector(".notelist");

    //empty notelist
    noteContainer.innerHTML = "";
    let notelist = "";
    for (const note of notes) {
      const { id, title, content, updated } = note;
      const html = this._createListItemHTML(id, title, content, updated);
      notelist += html;
    }

    noteContainer.innerHTML = notelist;
    noteContainer.querySelectorAll(".card").forEach((noteItem) => {
      noteItem.addEventListener("click", () => {
        this.onNoteSelect(noteItem.dataset.noteId);
      });
    });

    noteContainer.querySelectorAll(".note-trash").forEach((noteItem) => {
      noteItem.addEventListener("click", (e) => {
        e.stopPropagation();
        this.onNoteDelete(noteItem.dataset.noteId);
      });
    });
  }

  updateActiveNote(note) {
    this.root.querySelector(".notes-title").value = note.title;
    console.log(note.title);
    this.root.querySelector(".notes-body").value = note.content;
    console.log(note.content);
    this.root.querySelectorAll(".card").forEach((item) => {
      item.classList.remove("note__selected");
    });

    this.root
      .querySelector(`.card[data-note-id="${note.id}"]`)
      .classList.add("note__selected");
  }

  updateNodePreviewVisibility(visible) {
    this.root.querySelector(".form-group").style.Visibility = visible
      ? "visible"
      : "hidden";
  }

  

  
} 

