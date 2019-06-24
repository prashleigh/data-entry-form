const MongoClient = require('mongodb').MongoClient;

class DatabaseObject {
    constructor(routes) {
        this.routes = routes;
    }

    static async processDatabaseCommand(dbUrl, dbName, collectionName, command) {
        let result;
        const client = new MongoClient(dbUrl, { useNewUrlParser : true });
        await (async function() {
            try {
                // Use connect method to connect to the Server
                await client.connect();
        
                const db = client.db(dbName);
                const collection = db.collection(collectionName);
                result = await command(collection);
            } catch (err) {
                console.error(err.stack);
                result = {error:true}
            }
        })();
        return {result, close: () => client.close()}
    }

    addRoute(route) {
        this.routes.push(route);
        return this;
    }

    useRoutes(app) {
        for (const route of this.routes) {
            const method = route.method;
            const path = route.path;
            const handler = route.handler;
            app[method](path, handler);
        }
        return;
    }
}

module.exports = DatabaseObject;