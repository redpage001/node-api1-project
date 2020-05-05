import React, { useState } from "react";
import axios from "axios";

const AddUser = props => {
    const initialState = {
        name: "",
        bio: ""
    }

    const [addInput, setAddInput] = useState(initialState)

    const handleChange = e => {
        e.preventDefault();
        setAddInput({
            ...addInput,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users", addInput)
            .then(response => {
                console.log({ response })
                props.setUsers([
                    ...props.users,
                    response.data
                ]);
            })
            .catch(err => {
                console.log({ err })
            })
    }
    
    return(
        <form onSubmit = {handleSubmit}>
            <input 
                name = "name"
                type = "text"
                value = {addInput.name}
                onChange = {handleChange}
                placeholder = "name..."
            />
            <input 
                name = "bio"
                type = "text"
                value = {addInput.bio}
                onChange = {handleChange}
                placeholder = "bio..."
            />
            <button>Submit New User</button>
        </form>
    )
}

export default AddUser;