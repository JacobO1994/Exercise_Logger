import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory();

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch(
            '/exercises',
            {
                method: 'POST',
                body: JSON.stringify(newExercise),
                headers:{
                    'Content-Type': 'application/json'
                },                    
            }
        );
        if (response.status === 201){
            alert("Successful Add!");
        } else {
            alert("Failed Add");
            console.log(`Error ${response.status}`)
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                value={weight}
                placeholder="Enter weight here"
                onChange={e => setWeight(e.target.value)} />
            <input
                type = "text"
                value={unit}
                placeholder="Enter units here"
                onChange={e => setUnit(e.target.value)} />
            <input
                type="text"
                placeholder="Enter date here MM-DD-YY"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default AddExercisePage;