const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
// "username": "gisodprpoczmqi",
//     "password": "ccc515a42e17923f8b3519cfa893f0f7f20351d387e6d768e7041f122e872ef0",
//     "database": "dfqr4uhv1hmis7",
//     "host": "ec2-52-200-68-5.compute-1.amazonaws.com",
//     "port": 5432,
//     "dialect": "postgres",
//     "dialectOptions":{
//       "ssl": true
//     }