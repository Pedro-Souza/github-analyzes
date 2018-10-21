import express from "express";
import getRepos from './github/repos';

const server = express();


server.get("/user/:user", (req, res) => {
    getRepos(req.params.user).then(infos => {
        res.send(JSON.stringify(infos));
    });
});


export default server;