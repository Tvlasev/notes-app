const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => console.log("my notes...");

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(note => note.title === title);

    duplicateNotes.length === 0 
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
    getNotes,
    addNote,
    removeNote
}