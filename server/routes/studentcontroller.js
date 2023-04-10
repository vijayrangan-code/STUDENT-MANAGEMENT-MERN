const express = require("express");
const router = express.Router();
const mysql = require("mysql");


// mysql
const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
  //check database connection
  db.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connection success");
  });


router.get("/", (req, res) => {
    res.send("hello express");
  });

  // create router
// get data from mysql
router.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM details";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

// insert data 
router.post("/api/post", (req, res) => {
  const { firstname, lastname, location, email, dob, education } = req.body;
  const sqlInsert =
    "insert into details(FIRSTNAME,LASTNAME,LOCATION,EMAIL,DOB,EDUCATION) values(?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [firstname, lastname, location, email, dob, education],
    (error, result) => {
      if (error) {
        console.log(error);
      }
    }
  );
});


//delete data 
router.delete("/api/remove/:id", (req, res) => {
  const {id} = req.params;
  const sqlRemove = "DELETE FROM details WHERE ID = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});
// edit data
router.get("/api/get/:id", (req, res) => {
  const {id} =req.params;
  const sqlGet = "SELECT * FROM details WHERE id = ?";
  db.query(sqlGet, [id], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});
  //update data
  router.put("/api/update/:id", (req, res) => {
  const {id} =req.params;
  const { firstname, lastname, location, email, dob, education } = req.body;
    const sqlUpdate = "UPDATE details SET FIRSTNAME=?,LASTNAME=?,LOCATION=?,EMAIL=?,DOB=?,EDUCATION=? WHERE ID=?";
    db.query(sqlUpdate,  [firstname, lastname, location, email, dob, education,id], (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    });
});


  module.exports=router;