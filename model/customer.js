const connection = require("../database");
const bcrypt = require("bcrypt");

const Customer = {
    login: (req, callback) => {
        let query = "SELECT * FROM USERS WHERE userName = ?";
        return connection.query(query, [req.body.userName], callback);
    },
    register: (req, callback) => {
        const { body = {} } = req;
        const {
            fullName,
            sex,
            userName,
            email,
            province,
            address,
            pass,
            role,
        } = body;

        let query =
            "INSERT INTO USERS (fullName, sex, userName, email, province, address, pass, role) VALUES (?,?,?,?,?,?,?,?)";
        const hashPass = bcrypt.hashSync(pass, 10);

        return connection.query(
            query,
            [fullName, sex, userName, email, province, address, hashPass, role],
            callback
        );
    },
    create: (req, callback) => {
        const {
            codeUser,
            fullName,
            identifyFront,
            identifyBack,
            dateBirth,
            address,
            sex,
            job,
            workPlace,
            tempReg,
            email,
            avatar,
            phoneNumber,
            note,
        } = req.body;
        const { userId } = req.query;

        let query =
            "INSERT INTO CUSTOMERS (codeUser, fullName, identifyFront, identifyBack, dateBirth, address, sex, job, workPlace, tempReg, email, avatar, phoneNumber, idOwner, note) VALUES (?)";
        return connection.query(
            query,
            [
                [
                    codeUser,
                    fullName,
                    identifyFront,
                    identifyBack,
                    dateBirth,
                    address,
                    sex,
                    job,
                    workPlace,
                    tempReg,
                    email,
                    avatar,
                    phoneNumber,
                    userId,
                    note
                ],
            ],
            callback
        );
    },
    getAll: (req, callback) => {
        const { userId } = req.query;

        let query =
            "SELECT * FROM CUSTOMERS WHERE idOwner = ?";
        return connection.query(query, [userId], callback);
    },
    get: (id, callback) => {
        let query = "SELECT * FROM USERS WHERE id = ?";
        return connection.query(query, [id], callback);
    },
    delete: (req, callback) => {
        const { id = "" } = req.params;
        let query = "DELETE FROM CUSTOMERS WHERE id = ?";

        return connection.query(query, [id], callback);
    },
    deleteAll: (req, callback) => {
        const { customersId } = req.body;

        let query = "DELETE FROM CUSTOMERS WHERE id IN (?)";

        return connection.query(query, [customersId], callback);
    },
    update: (req, callback) => {
        const {
            codeUser,
            fullName,
            identifyFront,
            identifyBack,
            dateBirth,
            address,
            sex,
            job,
            workPlace,
            tempReg,
            email,
            avatar,
            phoneNumber,
            note,
        } = req.body;
        const { id = "" } = req.params;
        let query =
            "UPDATE CUSTOMERS SET fullName = ?, identifyFront = ?, identifyBack = ?, dateBirth = ?, address = ?, sex = ?, job = ?, workPlace = ?, tempReg = ?, email = ?, avatar = ?, phoneNumber = ?, note = ? WHERE id = ?";

        return connection.query(
            query,
            [
                fullName,
                identifyFront,
                identifyBack,
                dateBirth,
                address,
                sex,
                job,
                workPlace,
                tempReg,
                email,
                avatar,
                phoneNumber,
                note,
                id,
            ],
            callback
        );
    },
};

module.exports = Customer;
