// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database exercise_db in the MongoDB server running locally on port 27017
mongoose.connect(
    'mongodb://localhost:27017/exercise_db',
    { useNewUrlParser: true }
);

// Connect to to the database
const db = mongoose.connection;

// The open event is called when the database connection successfully opens
db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

// Tell mongoose to create indexes, which help with faster querying
mongoose.set('useCreateIndex', true);

/**
 * Define the schema
 */
const exercisesSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: {type: String, required: true},
    date: {type: String, required: true}
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exercisesSchema);

// ~~~~~~~~~~~~ Model CRUD Functionality ~~~~~~~~~~~~~~~~

// /**
//  * Create a exercise
//  * @param {String} name 
//  * @param {Number} reps
//  * @param {Number} weight 
//  * @param {String} unit
//  * @param {String} date 
//  * @returns A promise. Resolves to the JSON object for the document created by calling save
//  */
const createExercise = async (name, reps, weight, unit, date) => {
    // Constructor call
    const exercise = Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    // Persist object as doc in MongoDB
    return exercise.save();
}

// /**
//  * Find exercises
//  * @param {Object} filter
//  * @returns A promise. Resolves to the JSON object for the document created by calling save
//  */
const findExercise = async (filter) =>{
    const query = Exercise.find(filter);
    return query.exec();
}

const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({ _id: _id },
        { name: name, reps: reps, weight: weight, unit: unit, date: date });
        return result.nModified;
}

const deleteById = async (deleteById) => {
    let delID = deleteById
    console.log(typeof(delID));
    const result = await Exercise.deleteOne({_id: delID});
    // Return the count of deleted document. Since we called deleteOne, this will be either 0 or 1.
    return result.deletedCount;
}

export {createExercise, findExercise, replaceExercise, deleteById};