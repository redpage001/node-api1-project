import React, { useState } from "react";
import axios from "axios";

const UserCard = props => {
    const initialState = {
        name: "",
        bio: ""
    }

    const [isEditing, setIsEditing] = useState(false);
    const [editInput, setEditInput] = useState(initialState)

    const edit = e => {
        e.preventDefault();
        setIsEditing(!isEditing);
        axios.get(`http://localhost:8000/api/users/${props.user.id}`)
            .then(response => {
                console.log({ response });
                setEditInput(response.data);
            })
            .catch(err => {
                console.log({ err })
            })
    }

    const handleChange = e => {
        e.preventDefault();
        setEditInput({
            ...editInput,
            [e.target.name]: e.target.value
        })
    }
    
    const handleEdit = e => {
        e.preventDefault();
        axios.put (`http://localhost:8000/api/users/${props.user.id}`, editInput)
            .then(response => {
                console.log({ response })
                props.setUsers([
                    ...props.users.map(user => user.id === props.user.id ? response.data : user)
                ])
            })
            .catch(err => {
                console.log({ err })
            })
    }

    const handleDelete = e => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/users/${props.user.id}`)
            .then(response => {
                console.log({ response})
                props.setUsers([
                    ...props.users.filter(user => user.id !== props.user.id)
                ])
            })
            .catch(err => {
                console.log({ err })
            })
    }

    return(
        <>
            <div>
                <h2>Name: {props.user.name}</h2>
                <p>Bio: {props.user.bio}</p>
                <button onClick={edit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
            {isEditing && <form onSubmit={handleEdit}>
                            <input 
                                name = "name"
                                type = "text"
                                value = {editInput.name}
                                onChange = {handleChange}
                                placeholder = "Change Name..."
                            />
                            <input 
                                name = "bio"
                                type = "text"
                                value = {editInput.bio}
                                onChange = {handleChange}
                                placeholder = "Change Bio..."
                            />
                            <button>Save Edits</button>
                          </form>}
        </>
    )
}

export default UserCard;