const fs = require('fs');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

yargs.command({
    command: 'add',
    describe: "Add a new note",
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: "Remove a new note",
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: "List all notes",
    handler: function () {
        console.log("List the notes");
    }
})

yargs.command({
    command: 'read',
    describe: "Read note",
    handler: function () {
        console.log("Read the note");
    }
})

yargs.parse();
