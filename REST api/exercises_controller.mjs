import * as exercises from './exercises_model.mjs';
import express from 'express';
const app = express();

app.use(express.json())

const PORT = 3000;

/**
 * Create a new exercises
 */
 app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 400 in case of an error.
            // A better approach will be to examine the error and send an
            // error status code corresponding to the error.
            res.status(500).json({ Error: 'Request failed', Reason: "Missing input data", Source: "app.post()" });
        });
});


/**
 * Read the entire collection of exercises
 */
 app.get('/exercises', (req, res) => {
    // Defining an empty filter so that all members of the collection are returned
    const filter = {};
    exercises.findExercise(filter)
        .then(exercise => { 
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }         
         })
        .catch(error => {
            res.status(500).json({ Error: 'Request failed', Reason: "An excercise could not be pulled.", Source: "app.get()" });
        });

});


app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed', Reason: "Update params invalid", Source: "app.put()" });
        });
});

app.delete('/exercises/:id', (req, res) => {
    exercises.deleteById(req.params.id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed', Reason: "Delete invalid. Possible error with _id of deleted element.", Source: "app.delete()" });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});