const ObjectId = require('mongodb').ObjectId;

const Constants = require('../config');
const DatabaseObject = require('../DatabaseObject');

const routes = [
    {
        method: 'get',
        path: '/entry',
        handler: async (req, res) => {
            const { result, close } = await Entry.execute(async (collection) => await collection.find({}).toArray());
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
            close();
        }
    },
    {
        method: 'get',
        path: '/entry/:id',
        handler: async (req, res) => {
            const id = req.params.id;
            const { result, close } = await Entry.execute(async (collection) => await collection.findOne({_id:ObjectId(id)}));
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
            close();
        }
    },
    {
        method: 'post',
        path: '/entry',
        handler: async (req, res) => {
            const body = req.body;
            let { result, close } = await Entry.execute(async (collection) => {
                const data = await collection.insertOne(body);
                return await collection.findOne({_id:ObjectId(data.insertedId)})
            });
            // For some reason body gets mutated and an ID is added to the object
            // Get rid of it becase we lift the ID to the top level
            delete body._id;
            const entryVersion = await EntryVersion.execute(async (collection) =>
                await collection.insertOne({
                    entry_id: result._id,
                    entry: body,
                    version: 1
                }));
            entryVersion.close();
            close();
            res.setHeader('Content-Type', 'application/json');
            res.send({
                id: result._id,
                data: result
            });
            close();
        }
    },
    {
        method: 'put',
        path: '/entry/:id',
        handler: async (req, res) => {
            const id = req.params.id;
            const body = req.body;
            delete body._id;
            const currentEntryVersion = await EntryVersion.execute(async (collection) => 
                await collection.find({entry_id:ObjectId(id)}).limit(1).sort({version: -1}).next()
            );
            const addEntryVersion = await EntryVersion.execute(async (collection) => 
                await collection.insertOne({
                    entry_id: ObjectId(id),
                    entry: body,
                    version: currentEntryVersion.result.version + 1
                })
            );
            currentEntryVersion.close();
            addEntryVersion.close();
            const { result, close } = await Entry.execute(async (collection) => 
                await collection.findOneAndUpdate({_id:ObjectId(id)}, {$set: body}));
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
            close();
        }
    },
    {
        method: 'delete',
        path: '/entry',
        handler: async (req, res) => {
            const { result, close } = await Entry.execute(async (collection) => await collection.deleteMany({}));
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
            close();
        }
    },
    {
        method: 'delete',
        path: '/entry',
        handler: async (req, res) => {
            const id = req.params.id;
            if (!id) {
                return res.send({error:true});
            }
            let objectId;
            try {
                objectId = ObjectId(id);
            } catch {
                return res.send({error:true});
            }
            const { result, close } = await Entry.execute(async (collection) => await collection.deleteOne({_id:objectId}));
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
            close();
        }
    }
];

class Entry extends DatabaseObject {
    constructor(dbUrl, routes) {
        super(dbUrl, routes);
    }

    static async execute(command) {
        return await DatabaseObject.processDatabaseCommand(Constants.DB_URL, Constants.DB_NAME, Constants.ENTRY_COLLECTION, async (collection) => {
            return await command(collection);
        });
    }
}

class EntryVersion extends DatabaseObject {
    constructor(dbUrl, routes) {
        super(dbUrl, routes);
    }

    static async execute(command) {
        return await DatabaseObject.processDatabaseCommand(Constants.DB_URL, Constants.DB_NAME, Constants.ENTRY_VERSION_COLLECTION, async (collection) => {
            return await command(collection);
        });
    }
}

module.exports = new Entry(routes);