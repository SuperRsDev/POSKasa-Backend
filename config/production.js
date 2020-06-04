module.exports = {
    "db": {
        "name": process.env.DB_NAME ? process.env.DB_NAME : "db_nrs_pos20",
        "username": process.env.DB_USERNAME ? process.env.DB_USERNAME :"root",
        "password": process.env.DB_PASSWORD ? process.env.DB_PASSWORD :"123az45AZ!",
        "host": process.env.DB_HOST ? process.env.DB_HOST :"localhost",
        "port": process.env.DB_PORT ? process.env.DB_PORT :"3306",
        "dialect": "postgres" // mysql
    },
    "jwt": {
        "secret": process.env.JWT_SECRET ? process.env.JWT_SECRET : "12345678dasdpaskdoaskmod0kasodmMSWDAODpoASdsa5sa4548dsa",
        "expiresIn": process.env.JWT_EXPIRES ? process.env.JWT_EXPIRES : 180000
    },
    "host": {
        "port": "8080",
        "corsOrigin": "http://localhost:4200"
    }
}
