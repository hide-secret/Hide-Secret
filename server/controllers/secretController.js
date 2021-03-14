const db = require("../Database/Database");
const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

module.exports = {
  getAllSecrets: async (req, res, next) => {
    try {
      let query = "SELECT * FROM CreatedSecrets";

      const reply = await GET_ASYNC("allSecrets");

      if (reply) {
        console.log("Using cache to get allSecrets");
        res.locals.secrets = JSON.parse(reply);
        return next();
      }

      const data = await db.query(query);
      const saveResult = await SET_ASYNC(
        "allSecrets",
        JSON.stringify(data.rows),
        "EX",
        5
      );
      console.log(
        "all secrets had been cached. Pulling from database ",
        saveResult
      );
      res.locals.secrets = data.rows;
      return next();
    } catch (err) {
      return next(err);
    }
  },

  getUserStash: async (req, res, next) => {
    try {
      let { userID } = req.params;
      const userStash = await GET_ASYNC(`${userID}_stash`);

      if (userStash) {
        console.log("Grabbing secret stash from redis cache");
        res.locals.stash = JSON.parse(userStash);
        return next();
      }

      let query = "SELECT * FROM SecretStash WHERE userID = ($1)";
      const data = await db.query(query, [userID]);
      const saveUserStash = await SET_ASYNC(
        `${userID}_stash`,
        JSON.stringify(data.rows),
        "EX",
        10
      );
      console.log("UserID stash has been save to redis. Pulling from PG");
      res.locals.stash = data.rows;
      return next();
    } catch (err) {
      return next(err);
    }
  },

  postNewSecret: (req, res, next) => {
    let { message, userID, latitude, longitude } = req.body;
    let query =
      "INSERT INTO CreatedSecrets (message, userID, latitude, longitude) VALUES ($1, $2, $3, $4)";
    db.query(query, [message, userID, latitude, longitude]).then((data) => {
      return next();
    });
  },

  deleteAndStashSecret: (req, res, next) => {
    let { secretsID, userID } = req.body;
    let deleteQuery =
      "DELETE FROM CreatedSecrets WHERE secretsID = $1 RETURNING message";
    let stashQuery =
      "INSERT INTO SecretStash (message, userID) VALUES ($1, $2);";
    let scoreQuery = "UPDATE Users SET score = score + 1 WHERE userID = $1;";
    db.query(deleteQuery, [secretsID])
      .then((data) => {
        let { message } = data.rows[0];
        db.query(stashQuery, [message, userID])
          .then((data) => {
            db.query(scoreQuery, [userID])
              .then(() => next())
              .catch((err) => next(err));
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  },

  getAllRanking: (req, res, next) => {
    // SELECT username, score FROM users ORDER BY score DESC
    const rankAllQuery =
      "SELECT username, score, userID FROM users ORDER BY score DESC";
    db.query(rankAllQuery)
      .then((data) => {
        res.locals.globalRank = data.rows;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  },
};
