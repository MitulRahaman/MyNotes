//finding elements
const container = $(".container");
const form = document.querySelector(".form");
const input = document.querySelector("#input");
const addButton = document.querySelector("#addButton");
const lists = document.querySelector("#lists");
const message = document.querySelector("#message");

//create List
const createList = (valueID, values) => {
    const listElement = document.createElement("li");
    listElement.id = valueID;
    listElement.classList.add("li-style");
    listElement.innerHTML = `
        <span> ${values} </span>
        <span> <button class = "btn" id="deleteNote"> 
            <i class="fa fa-remove"> </i> </button>
        </span>
    `;
    lists.appendChild(listElement);

    const deleteNote = listElement.querySelector("#deleteNote");
    deleteNote.addEventListener("click", deleteList);
}

//show Message
const showMessage = (text, status) => {
    message.textContent = text;
    message.classList.add(`message-${status}`);
    setTimeout(() => {
        message.textContent = "";
        message.classList.remove(`message-${status}`);
    }, 1000)
}

//get Notes from LocalStorage
const getNotes = () => {
      return localStorage.getItem("myNotes") ?
            JSON.parse(localStorage.getItem("myNotes")) : [];
}

//add Notes
const addNote = (event) => {
    event.preventDefault();
    const values = input.value;

    //random unique id
    const valueID = Date.now().toString();
    createList(valueID, values);
    showMessage("New note Created!", "add");

    //push notes to localstorage
    const notes = getNotes();
    notes.push({ valueID, values });
    localStorage.setItem("myNotes", JSON.stringify(notes));

    input.value = "";

    
}

//delete Notes
const deleteList = (event) => {
    const selectedNote = event.target.parentElement.parentElement.parentElement;
    lists.removeChild(selectedNote);
    showMessage("Notes deleted successfully!", "remove");

    let notes = getNotes();
    notes = notes.filter((note) => note.valueID != selectedNote.id);
    localStorage.setItem("myNotes", JSON.stringify(notes));
}

//Load Notes
const loadNotes = () => {
    const loads = getNotes();
    loads.map((load) => createList(load.valueID, load.values));
};

//adding listeners
form.addEventListener("submit", addNote);
window.addEventListener("DOMContentLoaded", loadNotes);