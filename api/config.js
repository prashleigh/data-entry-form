module.exports = {
    DB_URL: process.env.DB_URL,
    DB_NAME: process.env.DB_NAME,
    ENTRY_COLLECTION: process.env.ENTRY_COLLECTION,
    ENTRY_VERSION_COLLECTION: process.env.ENTRY_VERSION_COLLECTION,
    API_PORT: process.env.API_PORT || 8001,
}