import express from "express";

const server = express();


server.get("/", (_, res) => {
    res.send(JSON.stringify({'result': 'Github Analyzes'}));
});


export default server;