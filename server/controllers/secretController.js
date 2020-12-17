const db = require("../Database/Database");

module.exports = {
  getAllSecrets: (req, res, next) => {
    let query = "SELECT * FROM CreatedSecrets";
    db.query(query).then((data) => {
      console.log(data);
      res.locals.secrets = data.rows;
      return next();
    }).catch((err) => {
      return next(err);
    });
  },

  getUserStash: (req, res, next) => {
    console.log('in getUserStash')
    let { userID } = req.params;
    let query = "SELECT * FROM SecretStash WHERE userID = ($1)";
    db.query(query, [userID]).then((data) => {
      console.log(data);
      res.locals.stash = data.rows;
      return next();
    }).catch((err) => {
      return next(err);
    });
  },

  postNewSecret: (req, res, next) => {
    let { message, userID, latitude, longitude } = req.body;
    let query =
      "INSERT INTO CreatedSecrets (message, userID, latitude, longitude) VALUES ($1, $2, $3, $4)";
    db.query(query, [message, userID, latitude, longitude])
      .then((data) => {
        console.log(data);
        return next();
      });
  },

  deleteAndStashSecret: (req, res, next) => {
    let { secretsID, userID } = req.body;
    console.log(secretsID, userID)
    let deleteQuery =
      "DELETE FROM CreatedSecrets WHERE secretsID = $1 RETURNING message";
    let stashQuery = "INSERT INTO SecretStash (message, userID) VALUES ($1, $2);";
    let scoreQuery = "UPDATE Users SET score = score + 1 WHERE userID = $1;"
    db.query(deleteQuery, [secretsID])
      .then((data) => {
        console.log(data);
        let {message} = data.rows[0]
        db.query(stashQuery, [message, userID])
        .then(data => {
          db.query(scoreQuery, [userID]).then(() => next())
          .catch(err => next(err))
        }).catch(err =>next(err))
      }).catch(err => next(err))
  },
};
