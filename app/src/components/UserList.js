import React, { useState, useEffect } from "react";
import axios from "axios";

import AddUser from "./AddUser";
import UserCard from "./UserCard";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/users")
            .then(response => {
                console.log({ response })
                setUsers(response.data)
            })
            .catch(err => {
                console.log({ err })
            })
    }, [])

    return (
        <>
            <AddUser users={users} setUsers={setUsers}/>
            <div>
                <h1>Users</h1>
                {users && users.map(user => {
                    return <UserCard 
                            key={user.id}
                            user={user} 
                            setUsers={setUsers}
                            users={users}
                            />
                })}
            </div>
        </>
    )
}

export default UserList;