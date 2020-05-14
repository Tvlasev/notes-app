const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    !duplicateNote
    ? notes.push({
        title,
        body
    })
    : console.log(chalk.red("This title already exist!"));

    saveNotes(notes);
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title);

    notes.length > notesToKeep.length
    ? console.log(chalk.green("Note removed!"))
    : console.log(chalk.red("No note found!"));

    saveNotes(notesToKeep);
}

const listNotes = () => {
    const notes = loadNotes();

    console.log("Your Notes: \n");
    notes.map(note => console.log(chalk.green(note.title)));
}

const readNote = (title) => {
    const notes = loadNotes();

    const note = notes.find(note => note.title === title);

    !note
    ? console.log(chalk.red("There is no note with this title"))
    : console.log(chalk.green("Title:\n"), note.title, chalk.green("\nBody:\n"), note.body)
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}