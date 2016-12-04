"use strict";

var knex = require('./knex.js')

function Users() {
    return knex("users")
}

function AddUser(firstName, lastName, username, password) {
    return knex("users").insert({
        firstName: firstName,
        lastName: lastName,
        username: username.toLowerCase(),
        password: password
    })
}
function AddToken(id,institutionName,token){
  return knex("users").where({
           id: id
       }).update({tokens:JSON.stringify({
         institutionName:institutionName,
         token:token
       })})
     }


module.exports = {
    Users: Users,
    AddUser: AddUser,
    AddToken
};
