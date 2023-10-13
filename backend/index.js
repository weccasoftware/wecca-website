const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const express = require("express");
const functions = require('firebase-functions');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;
app.use(cors());

const { URI, SECRET_TOKEN } = require("./secret");
const client = new MongoClient(URI);
client.connect();

const path = require("path");
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

const CryptoJS = require("crypto-js");

const BASE_URL = "http://localhost:3001"; //"https://wecca-website.onrender.com"
const WECCA_DB_NAME = "WECCA";
const USERS_COLLECTION_NAME = "Users-Test";
const EVENTS_COLLECTION_NAME = "Events-Test";

const level1Access = [
  "Software",
  "Design and Analysis",
  "Technical Communications",
  "Materials",
  "Mould",
  "Training",
  "Graphic Design",
  "General",
];

const level2Access = ["Executive"];

const level3Access = ["Captain"];

const levelMapping = {
  1: level1Access,
  2: level1Access.concat(level2Access),
  3: level1Access.concat(level2Access).concat(level3Access),
};

const encodeString = (str) => {
  return CryptoJS.AES.encrypt(JSON.stringify(str), SECRET_TOKEN).toString();
};

const decodeString = (str) => {
  const bytes = CryptoJS.AES.decrypt(str, SECRET_TOKEN);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

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
  console.log(
    "Called into GET events with access level of " +
      req.params.accessLevel +
      " and month " +
      req.params.month
  );
  const level = req.params.accessLevel;
  const month = parseInt(req.params.month);

  let foundEvents = [];
  let query = {
    team: {
      $in: levelMapping[level],
    },
    month: {
      $in: [month <= 0 ? 11 : month - 1, month, (month + 1) % 12],
    },
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
});

app.get("/api/calendar/teamEvents/:team", (req, res) => {
  console.log("Called into GET teamEvents for team " + req.params.team);
  const team = req.params.team;

  let foundEvents = [];
  const query = {
    team: team,
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
});

app.put("/api/calendar/event", (req, res) => {
  console.log("Called into PUT event");

  const payload = {
    ...req.body,
    createdAt: new Date(),
  };

  insertOne(WECCA_DB_NAME, EVENTS_COLLECTION_NAME, payload)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((e) => {
      res.statusMessage = e;
      return res.status(500).send();
    });
});

app.post("/api/calendar/event", (req, res) => {
  console.log("Called into POST event");

  const payload = {
    ...req.body.added,
    createdAt: new Date(),
  };

  deleteOneFrom(WECCA_DB_NAME, EVENTS_COLLECTION_NAME, req.body.deleted)
    .then((r) => {
      if (r.deletedCount !== 1)
        throw new Error("Failed to delete from database");
    })
    .then(() => insertOne(WECCA_DB_NAME, EVENTS_COLLECTION_NAME, payload))
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((e) => {
      res.statusMessage = e;
      return res.status(500).send();
    });
});

app.post("/api/calendar/events", (req, res) => {
  console.log("Called into POST events");

  const events = req.body;
  insertMany(
    WECCA_DB_NAME,
    EVENTS_COLLECTION_NAME,
    events.map((ev) => {
      return { ...ev, createdAt: new Date() };
    })
  )
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((e) => {
      res.statusMessage = e;
      return res.status(500).send();
    });
});

app.post("/api/calendar/deleteEvent", (req, res) => {
  console.log("Called into POST deleteEvent");

  deleteOneFrom(WECCA_DB_NAME, EVENTS_COLLECTION_NAME, req.body)
    .then((r) => {
      if (r.deletedCount !== 1)
        throw new Error("Failed to delete from database");
    })
    .then(() => {
      res.status(200).send();
    })
    .catch((e) => {
      res.statusMessage = e;
      return res.status(500).send();
    });
});

app.post("/api/calendar/deleteRecurringEvents", (req, res) => {
  console.log("Called into POST deleteRecurringEvents");
  const date = req.body.date;
  const payload = req.body.payload;

  const query = {
    ...payload,
    startTime: {
      $gt: date,
    },
  };

  deleteManyFrom(WECCA_DB_NAME, EVENTS_COLLECTION_NAME, query)
    .then((r) => {
      if (r.deletedCount === 0)
        throw new Error("Failed to delete from database");
    })
    .then(() => {
      res.status(200).send();
    })
    .catch((e) => {
      res.statusMessage = e;
      return res.status(500).send();
    });
});

app.post("/api/calendar/editRecurringEvents", (req, res) => {
  console.log("Called into POST editRecurringEvents");
  const date = req.body.date;
  const payload = req.body.payload;
  const discriminator = req.body.discriminator

  const key = {
    ...discriminator,
    startTime: {
      $gt: date,
    },
  };
  const query = {
    $set: payload
  }

  updateManyFrom(WECCA_DB_NAME, EVENTS_COLLECTION_NAME, key, query)
    .then((r) => {
      console.log(r);
      //if (r.deletedCount === 0)
      //throw new Error("Failed to delete from database");
    })
    .then(() => {
      res.status(200).send();
    })
    .catch((e) => {
      res.statusMessage = e;
      return res.status(500).send();
    });
});

app.put("/api/users/signup", (req, res) => {
  console.log("Called into PUT signup");

  const encryptedPassword = encodeString(req.body.password);
  const payload = {
    ...req.body,
    password: encryptedPassword,
    verified: false,
    validated: false,
  };

  if (!("name" in payload) || !("email" in payload) || !("team" in payload)) {
    res.statusMessage = "You are missing a required field!";
    return res.status(500).send(err);
  }

  getOneFrom(WECCA_DB_NAME, USERS_COLLECTION_NAME, { email: req.body.email })
    .then((foundUser) => {
      if (foundUser) {
        throw new Error("Account with this email already exists");
      }
    })
    .then(() => insertOne(WECCA_DB_NAME, USERS_COLLECTION_NAME, payload))
    .then((ins) => {
      if (!ins) {
        throw new Error(
          "Unexpected error creating account. Please try again later."
        );
      }

      return res.status(200).send({
        email: req.body.email,
        name: req.body.name,
        verificationUrl: generateVerificationUrl(req.body.name),
        validationUrl: generateValidationUrl(req.body.name),
      });
    })
    .catch((err) => {
      res.statusMessage = err.message;
      return res.status(500).send(err);
    });
});

app.post("/api/users/login", (req, res) => {
  console.log("Called into POST login");

  if (!("email" in req.body) || !("password" in req.body)) {
    res.statusMessage = "You are missing a required field!";
    return res.status(500).send(err);
  }

  getOneFrom(WECCA_DB_NAME, USERS_COLLECTION_NAME, { email: req.body.email })
    .then((foundUser) => {
      if (!foundUser) {
        throw new Error("Account does not exist");
      }
      if (req.body.password !== decodeString(foundUser.password)) {
        throw new Error("Incorrect password");
      }
      if (!foundUser.verified) {
        throw new Error("Please verify your account.");
      }
      if (!foundUser.validated) {
        throw new Error(
          "We have not yet verified your account. To expedite this process, reach out to Ethan or Dylan on slack."
        );
      }

      return {
        team: foundUser.team,
        name: foundUser.name,
        email: foundUser.email,
      };
    })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      res.statusMessage = err.message;
      return res.status(500).send();
    });
});

app.post("/verify", (req, res) => {
  console.log(`Verifying user with key = ${req.body.key}`);
  const key = req.body.key;
  const decoded = decodeString(key);

  let user = {}
  getOneFrom(WECCA_DB_NAME, USERS_COLLECTION_NAME, { email: req.body.email })
    .then((foundUser) => {
      if (!foundUser) {
        throw new Error("Account does not exist");
      }
      if (req.body.password !== decodeString(foundUser.password)) {
        throw new Error("Incorrect password");
      }
      if (decoded !== foundUser.name) {
        throw new Error(
          "Verification failed. Please reach out to Ethan on slack."
        );
      }

      user = foundUser;
      return foundUser.email;
    })
    .then((email) =>
      updateOneFrom(
        WECCA_DB_NAME,
        USERS_COLLECTION_NAME,
        { email: email },
        { $set: { verified: true } }
      )
    )
    .then(() => {
      let response = {
        success: true
      }

      if (user.validated) {
        response = {
          ...response,
          team: user.team,
          name: user.name,
          email: user.email
        }
      }

      return res.status(200).send(response);
    })
    .catch((err) => {
      res.statusMessage = err.message;
      return res.status(500).send();
    });
});

app.post("/validate", (req, res) => {
  console.log(`Validating user with key = ${req.body.key}`);
  const key = req.body.key;
  const decoded = decodeString(key);

  getOneFrom(WECCA_DB_NAME, USERS_COLLECTION_NAME, {
    email: req.body.email,
  })
    .then((foundUser) => {
      if (!foundUser) {
        throw new Error("Account does not exist");
      }
      if (req.body.password !== decodeString(foundUser.password)) {
        throw new Error("Incorrect password");
      }
      if (foundUser.team !== "Software") {
        throw new Error("Only the software team is allowed to validate users");
      }
    })
    .then(() =>
      getOneFrom(WECCA_DB_NAME, USERS_COLLECTION_NAME, { name: decoded })
    )
    .then((foundUser) => {
      if (!foundUser) {
        throw new Error("Account does not exist");
      }

      return foundUser.email;
    })
    .then((email) =>
      updateOneFrom(
        WECCA_DB_NAME,
        USERS_COLLECTION_NAME,
        { email: email },
        { $set: { validated: true } }
      )
    )
    .then(() => {
      return res.status(200).send({
        success: true
      });
    })
    .catch((err) => {
      res.statusMessage = err.message;
      return res.status(500).send({ success: false });
    });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

const generateVerificationUrl = (name) => {
  encodedName = encodeString(name);
  return `${BASE_URL}/verify?token=${encodedName}`;
};

const generateValidationUrl = (name) => {
  encodedName = encodeString(name);
  return `${BASE_URL}/validate?token=${encodedName}`;
};

/**
 * Helper function: query the MongoDB collection according to the entered query (with optional options) to insert many documents
 * @param {string} dbName: name of DB to connect to (we use "music")
 * @param {string} collectionName: name of the collection in the DB to query
 * @param {object} docs: documents to insert into the database
 * @returns an object with information about the insertion (success, etc.)
 */
const insertMany = async (dbName, collectionName, docs) => {
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  const result = collection.insertMany(docs).catch((e) => {
    throw new Error(e.message);
  });

  return result;
};

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

  const result = collection.insertOne(doc).catch((e) => {
    throw new Error(e.message);
  });

  return result;
};

/**
 * Helper function: query the MongoDB collection according to the entered query (with optional options) to delete a single document
 * @param {string} dbName: name of DB to connect to (we use "music")
 * @param {string} collectionName: name of the collection in the DB to query
 * @param {object} query: key for the object - uniquely identifies the object that is to be deleted
 * @returns an object with infromation about the deletion
 */
const deleteOneFrom = async (dbName, collectionName, query) => {
  await client.connect();
  try {
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const result = await collection.deleteOne(query);
    return result;
  } finally {
    await client.close();
  }
};

/**
 * Helper function: query the MongoDB collection according to the entered query (with optional options) to delete multiple documents
 * @param {string} dbName: name of DB to connect to (we use "music")
 * @param {string} collectionName: name of the collection in the DB to query
 * @param {object} query: key for the objects - identifies the objects that are to be deleted
 * @returns an object with information about the deletion
 */
const deleteManyFrom = async (dbName, collectionName, query) => {
  await client.connect();
  try {
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const result = await collection.deleteMany(query);
    return result;
  } finally {
    await client.close();
  }
};

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
const updateOneFrom = async (
  dbName,
  collectionName,
  key,
  query,
  additional = {}
) => {
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  const result = collection
    .findOneAndUpdate(key, query, additional)
    .catch((e) => {
      throw new Error(e.message);
    });

  return result;
};

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
const updateManyFrom = async (
  dbName,
  collectionName,
  key,
  query,
  additional = {}
) => {
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  const result = collection.updateMany(key, query, additional).catch((e) => {
    throw new Error(e.message);
  });

  return result;
};

app.listen(port, () => console.log(`Listening on port ${port}...`));
//exports.app = functions.https.onRequest(app);