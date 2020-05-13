const redis_client = require('../redis');
const contractModel = require('../model/contract');

const redisContract = (req, res, next) => {
    const { idBlock } = req.query;

    redis_client.get(`contracts:${idBlock}`, (err, data) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'Can\'t get contracts'
            })
            next()
        }

        if (data !== null) {
            res.send({
                status: res.statusCode,
                message: 'Get contracts success',
                data: {
                    contracts: JSON.parse(data)
                }
            })
        } else {
            next();
        }

    })
}
const redisCustomer = (req, res, next) => {
    const { userId } = req.query;

    redis_client.get(`customers:${userId}`, (err, data) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'Can\'t get customers'
            })
            next()
        }

        if (data !== null) {
            res.send({
                status: res.statusCode,
                message: 'Get customers success',
                data: {
                    customers: JSON.parse(data)
                }
            })
        } else {
            next();
        }

    })
}

module.exports = { redisContract, redisCustomer }