const redis = require('redis');

const PORT_REDIS = process.env.PORT || 6379;

const redis_client = redis.createClient()
redis_client.on('error', (error) => {
    console.log(error)
})

module.exports = redis_client