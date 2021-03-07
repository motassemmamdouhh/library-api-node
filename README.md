## library api

This is a library api where you can view book info

## Motivation

starting as python web developer i felt the need to expand my skill set, so i learned node js,mongodb building a complete secure RESTful api and simple front api for the vew

## Getting Started

you will need to use postman or curl to access this api and it's endpoints, and for the view just a web browser

## Dependcies and for developers

you will need express and mongoose packages to run this project, all required packages are in package.json
the api entry point is server.js where the connection to app and controllers are there.
models is associated with collections and documents and their functions.The api wont be expected to work without creating config file with certain values to database and its credentials

## API Reference

the "/" is for view where you can see all books , clicking a book will take you to '/:id' where you find all certain book details

url : '/api/v1/books', method-allowed : GET, body: None
this url will return to you all the available books in the collection,status code 200

url : '/api/v1/books', method-allowed : POST, body: {
title:'',
category:'',
description:'',
price:number,
rating:number
}
all the feilds are mandatory ,this endpoint will create a new book and put it in the collection and return 201 response.
if feilds are missing or misspelled it will return a 400 status code and an error message

url : '/api/v1/book/:id' method-allowed: get
this endpoint will search for the book with the id included in the url and return it along with a 200 status code.
if the id is not correct or the book does not exist it will return a 404 status code along with an error message

url : '/api/v1/book/:id' method-allowed: delete
this endpoint will search for the book with the id included in the url and delete it.
if the id is not correct or the book does not exist it will return a 404 status code along with an error message

url : '/api/v1/book/:id', method-allowed : PATCH, body: {
title:'',
category:'',
description:'',
price:number,
rating:number
}
you can just modify any feild or all of them ,this endpoint will fetch the book with the given id and update it in the collection it will return 202 response.
if feilds are missing or misspelled it will return a 400 status code and an error message.
if the book does not exist or the id is wrong it will return a 404 code and an error message

url : '/api/v1/users/signup', method-allowed : POST, body: {
name:'',
email:'',
password:'',
password_confirm:''
}
all the feilds are mandatory ,this endpoint will create a new user and put it in the collection and return 201 response and a jwt cookie with the user's token to gain access to protected routes.
if feilds are missing or misspelled it will return a 400 status code and an error message

url : '/api/v1/users/login', method-allowed : POST, body: {
email:'',
password:'',
}
all the feilds are mandatory ,this endpoint will fetch the user with given unique email and log it in with the given password
it will return the user's token as a cookie to gain access to protected routes
if feilds are missing or misspelled it will return a 400 status code and an error message
if the credentials does not meet it will return a 401 status code and an error message

and this is all endpoint for the api.

And for the roles at this api:
user: view books
librarian: view,post,patch books.
admin: view,post,patch,delete books.

# Deployment N/a

none

# Authors

    moatasem abdelkader
