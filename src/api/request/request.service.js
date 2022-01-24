const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO request(name,address,contact,email,bgroup,description) values(?,?,?,?,?,?)`,
            [
                data.name,
                data.address,
                data.contact,
                data.email,
                data.bgroup,
                data.description
            ], (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    }
}