const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// ROUTE 1 : Endpoint to fetch all notes /api/notes/fetchallnotes. Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured!")
    }
})

// ROUTE 2 : Endpoint to add notes /api/notes/addnote. Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Enter a valid desc').isLength({ min: 5 })], async (req, res) => {

        try {


            const { title, description, tag } = req.body;

            //Error handling
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.send({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()
            res.json(savedNote)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Some error occured!")
        }
    })

// ROUTE 3 : Endpoint to update all notes /api/notes/updatenote. Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    
    const { title, description, tag } = req.body;
    try {
    //Create a new note object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //Check if it's the same user and fetch/update the note
    let note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Not found")
    }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized")
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });
} catch (error) {
    console.error(error.message)
    res.status(500).send("Some error occured!")
}
})

// ROUTE 4 : Endpoint to delete a note /api/notes/updatenote. Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        
    
    //Check if it's the same user and delete the note
    let note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Not found")
    }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized")
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({ "Success" : "Note deleted successfully" });
} catch (error) {
    console.error(error.message)
    res.status(500).send("Some error occured!")
}
})

module.exports = router;