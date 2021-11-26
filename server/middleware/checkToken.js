const express = require("express");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
    jwt.verify(req.headers.token, process.env.JWT_KEY, (err, decodedToken) =>{
        if (err) { 
            return res.send(err);
        }
        else {
            req.userId = decodedToken.userId;   // Add to req object
            console.log(req.userId)
            next();
        }
    });
}

module.exports = {checkToken};