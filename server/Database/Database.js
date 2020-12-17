// CREATE TABLE Users(
//    userID SERIAL PRIMARY KEY,
//    userName VARCHAR (20) NOT NULL,
//    password VARCHAR (9) NOT NULL,
//    score int NOT NULL DEFAULT 0
//  );


//  CREATE TABLE CreatedSecrets(
//    secretsID SERIAL PRIMARY KEY, 
//    message VARCHAR (500), 
//    userID int NOT NULL,
//    latitude DECIMAL (10,7) NOT NULL,
//    longitude DECIMAL (10,7) NOT NULL,
//    FOREIGN KEY (userID) REFERENCES Users(userID)
//  );

//  CREATE TABLE SecretStash(
//    messageID SERIAL PRIMARY KEY,
//    message VARCHAR (500),
//    userID int NOT NULL,
//    FOREIGN KEY (userID) REFERENCES Users(userID)
//  )

const {Pool} = require('pg');

const myURI = 'postgres://uzcccgwc:ChKFVRFPLmOodr7CNBiDBqAfMISAH16G@suleiman.db.elephantsql.com:5432/uzcccgwc';
// const myURI = 'postgres://hsscjjrs:t1oBvBKd4IMLbdIgH25qJlsZUSlbDIb_@suleiman.db.elephantsql.com:5432/hsscjjrs';

const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: myURI
})

module.exports = {
  query: (text, params, callback) => {
    // console.log('executed query', text);
    return pool.query(text, params, callback);
  }}// <-- export your model

