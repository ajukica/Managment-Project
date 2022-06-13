const express = require("express");
const router = express.Router();
const db = require("../config/db");

/**
 * @route Type("post")
 * Create a student
 */
router.post("/create", (req,res) => {
    const {name,surname,email,courses,className} = req.body;

    if(!name || !surname || !email || !courses || !className )
        return res.status(400).json({msg: "Molimo unesite sve podatke!"});

    let sql = `INSERT INTO students SET ?`;

    const data ={
        Ime: name,
        Prezime: surname,
        Email: email,
        Courses: courses,
        ClassName : className
    }

    db.query(sql,data,(err,result)=>{
        if (err) return res.status(400).json({msg: "Neuspjesno umetanje"});

        return res.status(200).json({data});
    });
    
});

/**
 * @route Type("get")
 * Get all students
 */
router.get("/",(req,res)=>{
    let sql = `SELECT * FROM students`;

    db.query(sql,(err,result)=>{
        return res.status(200).json(result);
    });
});

/**
 * @route Type("update")
 * Update a student
 */
router.put("/update",(req,res)=>{
    const {id,name,surname,email,courses,className} = req.body;

    db.query(`UPDATE students SET Ime = ?,Prezime = ?,Email = ?, Courses = ?, ClassName = ?   WHERE id = ?`,[name,surname,email,courses,className,id],
        (err,result)=>{
        if (err) {
            return res.status(400).json({msg: "Neuspjesna izmjena"});
        } else {
            return res.status(200).json({msg: "Uspjesna izmjena"});;
        }       
    });
});

/**
 * @route Type("delete")
 * Delete a student
 */
router.delete("/delete",(req,res)=>{
    const id = req.body.id;
    db.query(`DELETE FROM students WHERE id = ?`,[id],
        (err,result)=>{
        if (err) {
            return res.status(400).json({msg: "Neuspjesno brisanje"});
        } else {
            return res.status(200).json({msg: "Uspjesno brisanje"});;
        }       
    });
})

module.exports = router;
