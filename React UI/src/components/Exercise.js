import React from 'react';
import { FiEdit, FiTrash2 } from "react-icons/fi";

function Exercise({ exercise, onEdit, onDelete }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>< FiEdit onClick={ () => onEdit(exercise)} /></td>
            <td>< FiTrash2 onClick={ () => onDelete(exercise._id)} /></td>
        </tr>
    );
}

export default Exercise;