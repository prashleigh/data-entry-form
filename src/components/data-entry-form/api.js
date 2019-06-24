import { schema, uischema } from '../../example';

const fetchData = async (url) => 
    await fetch(url).then(response => response.json())
                    .catch(err => { return {error: true, message: err} });

const fetchSchema = async (url) =>
    await schema;

const fetchUISchema = async (url) =>
    await uischema;

const createEntry = async (url) =>
    await fetch(url, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({}) // Create blank objects
    }).then(result => result.json())

const updateEntry = async (url, data) =>
    await fetch(url, {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(data)
    }).then(result => result.json())

export default {
    fetchData,
    fetchSchema,
    fetchUISchema,
    createEntry,
    updateEntry
}