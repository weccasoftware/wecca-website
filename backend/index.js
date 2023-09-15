const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;
app.use(cors());

const { URI, SECRET_TOKEN } = require("./secret");
const client = new MongoClient(URI);
client.connect();

const WECCA_DB_NAME = "WECCA";
const USERS_COLLECTION_NAME = "Users";
const EVENTS_COLLECTION_NAME = "Events";

const level1Access = [
    "Software",
    "Design and Analysis",
    "Technical Communications",
    "Materials",
    "Mould",
    "Training",
    "Graphic Design",
    "General"
]

const level2Access = [
    "Executive"
]

const level3Access = [
    "Captain"
]

const levelMapping = {
    1: level1Access,
    2: level1Access.concat(level2Access),
    3: level1Access.concat(level2Access).concat(level3Access)
}

app.get("/api/test", async (req, res) => {
  console.log("Called GET into test");
  let foundUsers = [];

  getAllFrom(WECCA_DB_NAME, USERS_COLLECTION_NAME, {})
    .then((results) => {
      foundUsers = results;
    })
    .then(() => {
      res.status(200).send(foundUsers);
    })
    .catch((e) => {
      res.statusMessage = e;
      return res.status(500).send();
    });
});

app.get("/api/calendar/events/:accessLevel/:month", (req, res) => {
    console.log("Called into GET events with access level of " + req.params.accessLevel + " and month " + req.params.month);
    const level = req.params.accessLevel;
    const month = parseInt(req.params.month);

    let foundEvents = [];
    let query = {
        team: {
            $in: levelMapping[level]
        },
        month: {
            $in: [month <= 0 ? 11 : month - 1, month, (month + 1) % 12]
        }
    }

    getAllFrom(WECCA_DB_NAME, EVENTS_COLLECTION_NAME, query)
    .then((results) => {
      foundEvents = results;
    })
    .then(() => {
      res.status(200).send(foundEvents);
    })
    .catch((e) => {
      res.statusMessage = e;
      return res.status(500).send();
    });
})

app.get("/api/calendar/teamEvents/:team", (req, res) => {
    console.log("Called into GET teamEvents for team " + req.params.team);
    const team = req.params.team;

    let foundEvents = [];
    const query = {
        team: team
    };

    getAllFrom(WECCA_DB_NAME, EVENTS_COLLECTION_NAME, query)
    .then((results) => {
      foundEvents = results;
    })
    .then(() => {
      res.status(200).send(foundEvents);
    })
    .catch((e) => {
      res.statusMessage = e;
      return res.status(500).send();
    });
})

app.put("/api/calendar/event", (req, res) => {
    console.log("Called into PUT event");

    insertOne(WECCA_DB_NAME, EVENTS_COLLECTION_NAME, req.body)
    .then((results) => {
        console.log(results)
        res.status(200).send(results);
    })
    .catch((e) => {
      res.statusMessage = e;
      return res.status(500).send();
    });
})

app.post("/api/calendar/event", (req, res) => {
    console.log("Called into POST event");

    deleteOneFrom(WECCA_DB_NAME, EVENTS_COLLECTION_NAME, req.body.deleted)
    .then((r) => {
        console.log(r)
        if(r.deletedCount !== 1) throw new Error("Failed to delete from database")
    }).then(() => insertOne(WECCA_DB_NAME, EVENTS_COLLECTION_NAME, req.body.added))
    .then((results) => {
        console.log(results)
      res.status(200).send(results);
    })
    .catch((e) => {
      res.statusMessage = e;
      return res.status(500).send();
    });
})

app.post("/api/calendar/deleteEvent", (req, res) => {
    console.log("Called into POST deleteEvent");

    deleteOneFrom(WECCA_DB_NAME, EVENTS_COLLECTION_NAME, req.body)
    .then((r) => {
        if(r.deletedCount !== 1) throw new Error("Failed to delete from database")
    })
    .then(() => {
      res.status(200).send();
    })
    .catch((e) => {
      res.statusMessage = e;
      return res.status(500).send();
    });
})

/**
 * Helper function: query the MongoDB collection according to the entered query (with optional options) to get a single result
 * @param {string} dbName: name of DB to connect to (we use "music")
 * @param {string} collectionName: name of the collection in the DB to query
 * @param {object} query: object to query the database with
 * @param {object} options: optional options (ie. ordering, include only specific attributes, etc)
 * @returns a single DB response object
 * I think findOne was wrongly deprecated
 */
const getOneFrom = async (dbName, collectionName, query, options = {}) => {
  await client.connect();
  const database = client.db(dbName);
  const collection = database.collection(collectionName);
  const result = await collection.findOne(query, options);
  return result;
};

/**
 * Helper function: query the MongoDB collection according to the entered query (with optional options) to get all results
 * @param {string} dbName: name of DB to connect to (we use "music")
 * @param {string} collectionName: name of the collection in the DB to query
 * @param {object} query: object to query the database with
 * @param {object} options: optional options (ie. ordering, include only specific attributes, etc)
 * @returns a complex DB response object
 */
const getAllFrom = async (dbName, collectionName, query, options = {}) => {
  await client.connect();
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  const list = [];
  const result = await collection.find(query, options);
  await result.forEach((entry) => {
    list.push(entry);
  });

  return list;
};

/**
 * Helper function: query the MongoDB collection according to the entered query (with optional options) to insert a single document
 * @param {string} dbName: name of DB to connect to (we use "music")
 * @param {string} collectionName: name of the collection in the DB to query
 * @param {object} doc: document to insert into the database
 * @returns an object with information about the insertion (success, etc.)
 */
const insertOne = async (dbName, collectionName, doc) => {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    
    const result = collection.insertOne(doc)
    .catch((e) => {throw new Error(e.message)})

    return result;
}

/**
 * Helper function: query the MongoDB collection according to the entered query (with optional options) to delete a single document
 * @param {string} dbName: name of DB to connect to (we use "music")
 * @param {string} collectionName: name of the collection in the DB to query
 * @param {object} query: key for the object - uniquely identifies the object that is to be deleted
 * @returns an object with infromation about the deletion
 */
const deleteOneFrom = async (dbName, collectionName, query) => {
    await client.connect()
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const result = await collection.deleteOne(query);
        return result;
    } 
    finally {
        await client.close();
    }
}

/**
 * Helper function: query the MongoDB collection according to the entered query (with optional options) to update a single document
 * @param {string} dbName: name of DB to connect to (we use "music")
 * @param {string} collectionName: name of the collection in the DB to query
 * @param {object} key: key for the object - uniquely identifies the object that is to be modified
 * @param {object} query: contains changes to make to the object identified by the key
 * @param {object} additional: optional options (ie. ordering, include only specific attributes, etc)
 * @returns a complex DB response object
 * I think findOneAndUpdate (with options) was wrongly deprecated
 */
const updateOneFrom = async (dbName, collectionName, key, query, additional={}) => {
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    
    const result = collection.findOneAndUpdate(key, query, additional)
    .catch((e) => {throw new Error(e.message)})

    return result;
}

app.listen(port, () => console.log(`Listening on port ${port}...`));
