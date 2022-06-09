const express = require("express");
const router = express.Router();
const db = require("../config/db");

/**
 * @route Type("post")
 * Create a class
 */
 router.post("/create", (req,res) => {
    const {naziv} = req.body;

    let sql = `INSERT INTO classes SET ?`;

    const data ={
        Naziv: naziv
    }

    db.query(sql,data,(err,result)=>{
        if (err) return res.status(400).json({msg: "Neuspjesno umetanje"});

        return res.status(200).json({data});
    });
    
});

/**
 * @route Type("get")
 * Get all classes
 */
 router.get("/",(req,res)=>{
    let sql = `SELECT * FROM classes`;

    db.query(sql,(err,result)=>{
        return res.status(200).json(result);
    });
});

/**
 * @route Type("update")
 * Update a class
 */
 router.put("/update",(req,res)=>{
    const id = req.body.id;
    const naziv = req.body.Naziv;

    db.query(`UPDATE classes SET Naziv = ? WHERE id = ?`,[naziv,id],
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
 * Delete a class
 */
 router.delete("/delete",(req,res)=>{
    const id = req.body.id;
    db.query(`DELETE FROM classes WHERE id = ?`,[id],
        (err,result)=>{
        if (err) {
            return res.status(400).json({msg: "Neuspjesno brisanje"});
        } else {
            return res.status(200).json({msg: "Uspjesno brisanje"});;
        }       
    });
})

module.exports = router;