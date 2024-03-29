"use strict";
var bcrypt = require("bcrypt")
var queries = require('./db/queries')
var passport = require('./passport');
var flash = require('connect-flash');


function hashedpass(password) {
    return bcrypt.hashSync(password, 10)
}

function findUser(username) {
    return queries.Users().first().where({
        username: username.toLowerCase(),
    })
}

function authenticateUser(username, password) {
    return findUser(username)
        .then(function(user) {
            if (user) {
                return bcrypt.compareSync(password, user.password)
            }
        })

}

function confirmpassword(username, password, password1) {
    if (password == password1) {
        return findUser(username)
    } else {
        return Promise.reject("Please confirm your password.")
    }
}

function Register(firstName, lastName, username, password, password1) {
    return confirmpassword(username, password, password1)
        .then(function(data) {
            if (!data) {
                var hash = hashedpass(password)
                return queries.AddUser(firstName, lastName, username, hash);
            } else {
                throw new Error("Username already exists.")
            }
        })
        .catch(function(error) {
            console.log(error);
        })
}

module.exports = {
    findUser: findUser,
    Register: Register,
    authenticateUser: authenticateUser,
}
