# Webshop-RESTful

Is an API for the exxas-webshop thing

## Tech stack:

- Typescript '5.2.2'
- Express.js
- Axios
- MongoDB

## Routes:

| Method   | Endpoint | Description | Request Headers                                            |
|----------|----------|-------------|------------------------------------------------------------|
| **POST** | /import  | Import data | Overwrite = `true/false`, Content-Type = `application/xml` |
| **GET**  | /export  | Export data | Content-Type = `application/json`                          |