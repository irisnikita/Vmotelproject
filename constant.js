const appConfig = {
    ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE || "3650d",
    ACCESS_TOKEN_SECERET: process.env.ACCESS_TOKEN_SECRET || "access-token-secret-nltruongvi",
    REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE || "3650d",
    REFRESH_TOKEN_SECERET: process.env.ACCESS_TOKEN_SECRET || "refresh-token-secret-nltruongvi",
    API: 'http://127.0.0.1:8000',
}

module.exports = appConfig;