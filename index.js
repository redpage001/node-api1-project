const express = require("express");
const shortid = require("shortid");
const cors = require("cors");

const server = express();
const port = 8000;

server.use(express.json());
server.use(cors());

let data = [
    {
        id: shortid.generate(),
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane",
      },
];

server.get("/", (req, res) => {
    res.json({
        api: "Up and Running"
    });
});

server.get("/api/users", (req, res) => {
    if(data){
        res.status(200).json(data)
    } else {
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    };
});

server.post("/api/users", (req, res) => {
    if(req.body.hasOwnProperty("name") && req.body.hasOwnProperty("bio")){
        const userData = {
            id: shortid.generate(),
            ...req.body
        };
        data.push(userData);
        res.status(201).json(userData);
    }else if(!req.body.hasOwnProperty("name") || !req.body.hasOwnProperty("bio")){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }else{
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
    }
});

server.get("/api/users/:id", (req, res) => {
    let inputId = req.params.id;
    let dataById = data.find(({id}) => id === inputId);

    if(dataById){
        res.status(200).json(dataById);
    }else if(!dataById){
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }else{
        res.status(500).json({ errorMessage: "The users information could not be retrieved." });
    }
});

server.delete("/api/users/:id", (req, res) => {
    let inputId = req.params.id;
    let dataById = data.find(({id}) => id === inputId);

    if(dataById){
        data = data.filter(value => value.id !== inputId);
        res.status(200).json(dataById);
    }else if(!dataById){
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }else{
        res.status(500).json({ errorMessage: "The user could not be removed" });
    }
});

server.put("/api/users/:id", (req, res) => {
    let inputId = req.params.id;
    let dataById = data.find(({id}) => id === inputId);

    const editedUser = {
        id: dataById.id,
        ...req.body
    }

    if(dataById && req.body.hasOwnProperty("name") && req.body.hasOwnProperty("bio")){
        data = data.map(value => value.id === inputId ? editedUser : value);
        res.status(200).json(editedUser);
    }else if(!dataById){
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }else if(!req.body.hasOwnProperty("name") || !req.body.hasOwnProperty("bio")){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }else{
        res.status(500).json({ errorMessage: "The user information could not be modified." });
    }
});

server.listen(8000, () => {
    console.log(`Listening on port ${port}`);
});